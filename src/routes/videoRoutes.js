// src/routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { 
  getActiveVideos, 
  getAllVideos, 
  createVideo, 
  updateVideo, 
  deleteVideo 
} = require('../controllers/videoController');

// Portes Publiques
router.get('/', getActiveVideos);

// Portes Privees (Protegees)
router.get('/all', protect, getAllVideos);
router.post('/', protect, createVideo);
router.put('/:id', protect, updateVideo);
router.delete('/:id', protect, deleteVideo);

module.exports = router;