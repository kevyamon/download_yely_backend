// src/routes/statRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { 
  incrementAndroidClick, 
  incrementIosClick, 
  incrementVisitor, 
  getStats 
} = require('../controllers/statController');

// 🟢 Portes Publiques (Le site web Frontend cliquera sur ces liens de maniere invisible)
router.post('/android', incrementAndroidClick);
router.post('/ios', incrementIosClick);
router.post('/visitor', incrementVisitor);

// 🔴 Porte Privee (Toi seul a le droit de lire le total des stats)
router.get('/', protect, getStats);

module.exports = router;