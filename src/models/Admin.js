// src/models/Admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Action automatique AVANT de sauvegarder dans la base de donnees
adminSchema.pre('save', async function(next) {
  // Si le mot de passe n'a pas ete modifie, on passe a la suite
  if (!this.isModified('password')) {
    return next();
  }
  
  // On crypte le mot de passe avec une force de 10 (Salt)
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Methode pour verifier le mot de passe lors de la connexion
adminSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;