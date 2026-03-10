// src/server.js
const express = require('express');
const http = require('http'); // Requis pour les WebSockets
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { initSocket } = require('./config/socket'); // Notre service Socket

// Import de toutes nos routes
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const statRoutes = require('./routes/statRoutes');
const founderRoutes = require('./routes/founderRoutes');
const videoRoutes = require('./routes/videoRoutes');

// Chargement des variables d'environnement
dotenv.config();

// Connexion a la base de donnees
connectDB();

// Initialisation de l'application Express
const app = express();

// Creation du serveur HTTP qui enveloppe Express
const server = http.createServer(app);

// Demarrage du moteur Temps Reel (Socket.io) sur ce serveur
initSocket(server);

// Middlewares de securite et utilitaires
app.use(helmet()); 
app.use(cors()); 
app.use(express.json()); 
app.use(morgan('dev')); 

// Routage API
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/founders', founderRoutes);
app.use('/api/videos', videoRoutes);

// Route de verification de sante (Healthcheck)
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    statut: 'Operationnel',
    message: 'API de la Download Page prete avec WebSockets.',
    environnement: process.env.NODE_ENV
  });
});

// Gestion des routes inexistantes (404)
app.use((req, res) => {
  res.status(404).json({ message: "Cette route n'existe pas." });
});

// ATTENTION : On demarre desormais "server" et non plus "app"
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`[Serveur] Demarre sur le port ${PORT} en mode ${process.env.NODE_ENV} avec WebSockets actives`);
});