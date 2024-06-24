const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors()); // Enable CORS for all requests

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your frontend URL for better security
    methods: ["GET", "POST"]
  }
});

// Your Socket.io logic
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

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
