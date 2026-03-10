// src/controllers/statController.js
const Stat = require('../models/Stat');

// Fonction intelligente : Si le tableau de bord des stats n'existe pas encore, elle le cree.
const getOrCreateStatDocument = async () => {
  let stat = await Stat.findOne();
  if (!stat) {
    stat = await Stat.create({});
  }
  return stat;
};

// Ajouter +1 au compteur Android
const incrementAndroidClick = async (req, res) => {
  try {
    const stat = await getOrCreateStatDocument();
    stat.androidClicks += 1;
    await stat.save();
    res.status(200).json({ message: "Clic Android enregistre." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Ajouter +1 au compteur iOS
const incrementIosClick = async (req, res) => {
  try {
    const stat = await getOrCreateStatDocument();
    stat.iosClicks += 1;
    await stat.save();
    res.status(200).json({ message: "Clic iOS enregistre." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Ajouter +1 au compteur de visiteurs (quand on ouvre la page)
const incrementVisitor = async (req, res) => {
  try {
    const stat = await getOrCreateStatDocument();
    stat.visitorsCount += 1;
    await stat.save();
    res.status(200).json({ message: "Visiteur enregistre." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Lire les compteurs actuels (Admin)
const getStats = async (req, res) => {
  try {
    const stat = await getOrCreateStatDocument();
    res.status(200).json(stat);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la recuperation des statistiques." });
  }
};

module.exports = { incrementAndroidClick, incrementIosClick, incrementVisitor, getStats };