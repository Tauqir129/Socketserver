const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your frontend URL for better security
    methods: ["GET", "POST"]
  }
});

app.get("/", (req, res) => {
  res.send("Socket.io server running");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (msg) => {
    console.log("Message received: ", msg);
    socket.broadcast.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});

module.exports = (req, res) => {
  res.send("Socket.io server running");
};
