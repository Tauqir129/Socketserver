// Import necessary libraries
const http = require('http');
const socketIo = require('socket.io');

// Create an HTTP server
const server = http.createServer();

// Initialize Socket.IO
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

// Set up event listeners
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', (data) => {
    console.log('Received message:', data);
    // Broadcast the message to all clients
    io.emit('message', `Server received: ${data}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
