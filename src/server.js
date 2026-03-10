// src/server.js
const express = require('express');
const http = require('http'); 
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { initSocket } = require('./config/socket');

// Import de toutes nos routes
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const statRoutes = require('./routes/statRoutes');
const founderRoutes = require('./routes/founderRoutes');
const videoRoutes = require('./routes/videoRoutes');
const configRoutes = require('./routes/configRoutes');

// Chargement des variables d'environnement
dotenv.config();

// Connexion a la base de donnees
connectDB();

// Initialisation de l'application Express
const app = express();

// Creation du serveur HTTP qui enveloppe Express
const server = http.createServer(app);

// Demarrage du moteur Temps Reel (Socket.io)
initSocket(server);

// 🛡️ VERROUILLAGE CORS BANK GRADE 🛡️
// On n'accepte QUE l'URL définie dans le .env, sinon on retombe sur le localhost temporairement
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

const corsOptions = {
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Autorise l'envoi de headers/cookies sécurisés
};

// Middlewares de securite et utilitaires
app.use(helmet()); 
app.use(cors(corsOptions)); // Application du bouclier CORS
app.use(express.json()); 
app.use(morgan('dev')); 

// Réponse pour le robot de Render (Contrôle de santé pour éviter les 404 dans les logs)
app.get('/', (req, res) => res.status(200).send('API Yely Bank Grade Opérationnelle.'));

// Routage API
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/founders', founderRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/config', configRoutes);

// Route de verification de sante specifique (Healthcheck)
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    statut: 'Operationnel',
    message: 'API prete et securisee par CORS.',
    originAutorisee: allowedOrigin,
    environnement: process.env.NODE_ENV
  });
});

// Gestion des routes inexistantes (404)
app.use((req, res) => {
  res.status(404).json({ message: "Cette route n'existe pas." });
});

// Demarrage du serveur
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`[Serveur] Demarre sur le port ${PORT} en mode ${process.env.NODE_ENV}`);
  console.log(`[Sécurité] Connexions autorisées uniquement depuis : ${allowedOrigin}`);
});