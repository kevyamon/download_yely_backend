// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { loginAdmin, setupInitialAdmin } = require('../controllers/authController');

// 🛡️ BOUCLIER ANTI-FORCE BRUTE
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limite chaque IP à 5 requêtes par fenêtre de 15 min
  message: { message: "Trop de tentatives de connexion. Verrouillage de sécurité actif (15 minutes)." }
});

// On applique le bouclier UNIQUEMENT sur la route de connexion
router.post('/login', loginLimiter, loginAdmin);

// La route d'installation reste comme avant
router.post('/setup', setupInitialAdmin);

module.exports = router;