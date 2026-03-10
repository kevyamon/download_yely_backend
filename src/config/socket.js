// src/config/socket.js
const { Server } = require('socket.io');

let io;

const initSocket = (server) => {
  // 🛡️ VERROUILLAGE CORS POUR LES SOCKETS 🛡️
  const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

  io = new Server(server, {
    cors: {
      origin: allowedOrigin,
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log(`[Socket] Nouveau client connecté: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`[Socket] Client déconnecté: ${socket.id}`);
    });
  });
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io n'a pas été initialisé !");
  }
  return io;
};

module.exports = { initSocket, getIo };