// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Fonction utilitaire pour generer le badge d'acces (JWT)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Connexion de l'administrateur
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. On cherche l'admin par son email
    const admin = await Admin.findOne({ email });

    // 2. On verifie si l'admin existe ET si le mot de passe est correct
    if (admin && (await admin.matchPassword(password))) {
      res.status(200).json({
        _id: admin._id,
        email: admin.email,
        token: generateToken(admin._id)
      });
    } else {
      res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la connexion." });
  }
};

// Creation du tout premier administrateur (Toi)
// Cette route se bloquera definitivement des qu'un admin existera
const setupInitialAdmin = async (req, res) => {
  try {
    const adminCount = await Admin.countDocuments();
    
    if (adminCount > 0) {
      return res.status(403).json({ message: "L'installation initiale est deja terminee. Un administrateur existe deja." });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Veuillez fournir un email et un mot de passe." });
    }

    const admin = await Admin.create({
      email,
      password
    });

    res.status(201).json({
      message: "Premier administrateur cree avec succes. Vous pouvez maintenant vous connecter.",
      email: admin.email
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'installation initiale." });
  }
};

module.exports = {
  loginAdmin,
  setupInitialAdmin
};