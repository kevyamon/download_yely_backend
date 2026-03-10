// src/config/socket.js
const { Server } = require('socket.io');

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*', // En production, on restreindra cela a l'URL de ta Download Page
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
  });

  io.on('connection', (socket) => {
    console.log(`[Socket] Nouvel appareil connecte : ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`[Socket] Appareil deconnecte : ${socket.id}`);
    });
  });

  return io;
};

// Fonction utilitaire pour recuperer l'instance Socket n'importe ou dans le code
const getIo = () => {
  if (!io) {
    throw new Error('Socket.io n\'a pas ete initialise !');
  }
  return io;
};

module.exports = { initSocket, getIo };