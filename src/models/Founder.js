// src/models/Founder.js
const mongoose = require('mongoose');

const founderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  description: { // Changé de 'story' à 'description' pour correspondre au Dashboard
    type: String,
    required: true
  },
  imageUrl: { // Changé de 'imageFilename' à 'imageUrl'
    type: String,
    required: false // Optionnel car on a un placeholder en cas d'absence
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Founder = mongoose.model('Founder', founderSchema);

module.exports = Founder;