// src/server.js
const express = require('express');
const http = require('http'); 
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { initSocket } = require('./config/socket');

// Import de routes
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const statRoutes = require('./routes/statRoutes');
const founderRoutes = require('./routes/founderRoutes');
const videoRoutes = require('./routes/videoRoutes');
const configRoutes = require('./routes/configRoutes');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

initSocket(server);

// 🛡️ VERROUILLAGE CORS BANK GRADE (ULTRA STRICT) 🛡️
// Si on est sur Render, FRONTEND_URL DOIT être défini.
const allowedOrigins = process.env.FRONTEND_URL 
  ? [process.env.FRONTEND_URL] 
  : ['http://localhost:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    // Autorise les requêtes sans origine (ex: requêtes internes du serveur) uniquement si on n'est pas en production
    if (!origin && process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // Vérification stricte
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`🚨 [PARE-FEU] Tentative d'accès bloquée depuis l'origine : ${origin}`);
      callback(new Error('Accès refusé par le système de sécurité Yely (CORS).'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(helmet()); 
app.use(cors(corsOptions)); 
app.use(express.json()); 
app.use(morgan('dev')); 

app.get('/', (req, res) => res.status(200).send('API Yely Bank Grade Opérationnelle.'));

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/founders', founderRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/config', configRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    statut: 'Operationnel',
    message: 'API prete et securisee par CORS.',
    originesAutorisees: allowedOrigins,
    environnement: process.env.NODE_ENV
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Cette route n'existe pas." });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`[Serveur] Demarre sur le port ${PORT}`);
  console.log(`[Sécurité] Bouclier CORS actif. Origines acceptées : ${allowedOrigins.join(', ')}`);
});