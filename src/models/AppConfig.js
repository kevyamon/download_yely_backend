// src/models/AppConfig.js
const mongoose = require('mongoose');

const appConfigSchema = new mongoose.Schema({
  apkUrl: { type: String, default: '' },
  pwaUrl: { type: String, default: '' },
  androidVersion: { type: String, default: '1.0.0' },
  iosVersion: { type: String, default: '1.0.0' }
}, {
  timestamps: true
});

module.exports = mongoose.model('AppConfig', appConfigSchema);