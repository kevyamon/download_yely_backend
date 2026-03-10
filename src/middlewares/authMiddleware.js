// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;

  // On verifie si la requete contient un en-tete d'autorisation valide
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // On recupere le jeton (token) en enlevant le mot "Bearer "
      token = req.headers.authorization.split(' ')[1];

      // On decrypte le jeton avec notre cle secrete
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // On cherche l'admin correspondant dans la base de donnees (sans renvoyer son mot de passe)
      req.admin = await Admin.findById(decoded.id).select('-password');

      // Le vigile laisse passer la requete vers la suite
      next();
    } catch (error) {
      console.error('[Securite] Echec de verification du token');
      res.status(401).json({ message: "Non autorise, jeton invalide ou expire." });
    }
  }

  // Si aucun jeton n'a ete trouve
  if (!token) {
    res.status(401).json({ message: "Non autorise, aucun jeton fourni." });
  }
};

module.exports = { protect };