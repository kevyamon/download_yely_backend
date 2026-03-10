// src/models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  iconName: {
    type: String,
    required: true,
    default: 'link-outline'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;