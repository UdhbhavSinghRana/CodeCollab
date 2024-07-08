const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
});


app.use(cors());



io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('join-room', (room) => {
    socket.join(room);
    console.log(`Client joined room: ${room}`);
  });

  socket.on('code-update', (data) => {
    io.to(data.room).emit('code-update', data);
  });

  socket.on('input-update', (data) => {
    io.to(data.room).emit('input-update', data);
  });

  socket.on('run-code', (data) => {
    io.to(data.room).emit('run-code', data);
  });

  socket.on('output-update', (data) => {
    io.to(data.room).emit('output-update', data);
  });

  socket.on('theme-update', (data) => {
    io.to(data.room).emit('theme-update', data);
  });

  socket.on('lang-update', (data) => {
    io.to(data.room).emit('lang-update', data);
  });

  socket.on('whiteboard-update', (data) => {
    // Broadcast the update to all clients in the same room
    console.log('whiteboard-update', data);
    io.to(data.room).emit('whiteboard-update', data.imageData);
  });

  socket.on('toggled-whiteboard', (data) => {
    io.to(data.room).emit('toggled-whiteboard', data);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
