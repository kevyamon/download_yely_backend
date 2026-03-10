// src/config/socket.js
const { Server } = require('socket.io');

let io;

const initSocket = (server) => {
  // 🛡️ VERROUILLAGE CORS POUR LES SOCKETS 🛡️
  const allowedOrigins = process.env.FRONTEND_URL 
    ? [process.env.FRONTEND_URL] 
    : ['http://localhost:5173'];

  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    // Optionnel : On peut lire d'où vient la connexion socket pour déboguer
    const origin = socket.handshake.headers.origin;
    console.log(`[Socket] Nouveau client connecté: ${socket.id} depuis ${origin}`);

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