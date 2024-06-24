const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Socket.io server running");
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
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
  if (req.method === 'GET') {
    res.status(200).send('Socket.io server running');
  }
};
