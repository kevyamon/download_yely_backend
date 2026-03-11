// src/routes/statRoutes.js
const express = require('express');
const router = express.Router();

const { 
  incrementAndroidClick, 
  incrementIosClick, 
  incrementVisitor, 
  getStats 
} = require('../controllers/statController');

// Portes Publiques (Le site web Frontend cliquera sur ces liens de maniere invisible)
router.post('/android', incrementAndroidClick);
router.post('/ios', incrementIosClick);
router.post('/visitor', incrementVisitor);

// Porte Publique (Autorise le Frontend a lire le total des stats pour l'affichage)
router.get('/', getStats);

module.exports = router;