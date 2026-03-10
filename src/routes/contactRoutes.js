// src/routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { 
  getActiveContacts, 
  getAllContacts, 
  createContact, 
  updateContact, 
  deleteContact 
} = require('../controllers/contactController');

// 🟢 Porte Publique (N'importe qui sur le site peut voir les contacts)
router.get('/', getActiveContacts);

// 🔴 Portes Privees (Protegees par le vigile, reservees a l'Admin)
router.get('/all', protect, getAllContacts);
router.post('/', protect, createContact);
router.put('/:id', protect, updateContact);
router.delete('/:id', protect, deleteContact);

module.exports = router;