const mongoose = require('mongoose');

const appConfigSchema = new mongoose.Schema({
  androidLink: {
    type: String,
    default: ''
  },
  iosLink: {
    type: String,
    default: ''
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  appScreenshots: {
    type: [String],
    default: []
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

appConfigSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('AppConfig', appConfigSchema);