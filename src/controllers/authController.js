// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// 🛡️ SECURITY BY OBSCURITY
const getSecretKey = () => process.env.DB_CONNECTION_RETRY_HASH || 'fallback_yely_secret_2026';
const getTokenExpire = () => process.env.CACHE_FLUSH_INTERVAL || '24h';

const generateToken = (id) => {
  return jwt.sign({ id }, getSecretKey(), {
    expiresIn: getTokenExpire(),
  });
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.status(200).json({
        _id: admin._id,
        email: admin.email,
        token: generateToken(admin._id)
      });
    } else {
      res.status(401).json({ message: "Identifiants invalides ou accès refusé." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la connexion." });
  }
};

// 🔒 ROUTE D'INSTALLATION ULTRA-SÉCURISÉE
const setupInitialAdmin = async (req, res) => {
  try {
    // 1. VÉRIFICATION DU CADENAS D'USINE
    const setupToken = req.headers['x-setup-key'];
    const expectedToken = process.env.SYSTEM_INIT_KEY || 'yely_master_install_key_2026';

    if (setupToken !== expectedToken) {
      console.warn("⚠️ Tentative d'installation non autorisée bloquée !");
      return res.status(403).json({ message: "Accès refusé. Clé d'amorçage système manquante ou invalide." });
    }

    // 2. VÉRIFICATION ANTI-DOUBLON
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return res.status(403).json({ message: "L'installation initiale est deja terminee. Verrouillage actif." });
    }

    // 3. CRÉATION
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Veuillez fournir un email et un mot de passe." });
    }

    const admin = await Admin.create({ email, password });

    res.status(201).json({
      message: "Premier administrateur cree avec succes. Le systeme est maintenant verrouillé.",
      email: admin.email
    });
  } catch (error) {
    // 🚨 LE DÉTECTEUR DE MENSONGES EST ICI 🚨
    console.error("🔥 ERREUR CRITIQUE LORS DE LA CRÉATION :", error);
    res.status(500).json({ 
      message: "Erreur lors de l'installation initiale.",
      details: error.message // On renvoie la vraie cause de l'erreur !
    });
  }
};

module.exports = {
  loginAdmin,
  setupInitialAdmin
};