// src/models/Stat.js
const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  androidClicks: {
    type: Number,
    default: 0
  },
  iosClicks: {
    type: Number,
    default: 0
  },
  visitorsCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Stat = mongoose.model('Stat', statSchema);

module.exports = Stat;