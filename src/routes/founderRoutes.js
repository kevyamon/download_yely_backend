// src/routes/founderRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { 
  getFounders, 
  createFounder, 
  updateFounder, 
  deleteFounder 
} = require('../controllers/founderController');

// Porte Publique
router.get('/', getFounders);

// Portes Privees (Protegees)
router.post('/', protect, createFounder);
router.put('/:id', protect, updateFounder);
router.delete('/:id', protect, deleteFounder);

module.exports = router;