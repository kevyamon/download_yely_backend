// src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`[Base de donnees] MongoDB Connecte : ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Erreur Critique] Echec de connexion MongoDB : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;