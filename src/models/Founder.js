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
  story: {
    type: String,
    required: true
  },
  imageFilename: {
    type: String,
    required: true
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