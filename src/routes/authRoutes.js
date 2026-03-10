// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { loginAdmin, setupInitialAdmin } = require('../controllers/authController');

// Route publique pour se connecter
router.post('/login', loginAdmin);

// Route d'installation (ne marchera qu'une seule fois)
router.post('/setup', setupInitialAdmin);

module.exports = router;