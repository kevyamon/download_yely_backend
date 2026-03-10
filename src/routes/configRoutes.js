// src/routes/configRoutes.js
const express = require('express');
const router = express.Router();
const { getConfig, updateConfig } = require('../controllers/configController');
const { protect } = require('../middlewares/authMiddleware');

// Route publique pour que le site puisse lire les liens
router.get('/', getConfig);

// Route protégée : Seul l'Admin peut modifier les liens
router.put('/', protect, updateConfig);

module.exports = router;