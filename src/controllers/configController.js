// src/controllers/configController.js
const AppConfig = require('../models/AppConfig');

const getConfig = async (req, res) => {
  try {
    let config = await AppConfig.findOne();
    // Si la configuration n'existe pas encore, on la crée vide
    if (!config) {
      config = await AppConfig.create({}); 
    }
    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la configuration." });
  }
};

const updateConfig = async (req, res) => {
  try {
    const { apkUrl, pwaUrl, androidVersion, iosVersion } = req.body;
    let config = await AppConfig.findOne();
    
    if (!config) {
      config = await AppConfig.create(req.body);
    } else {
      if (apkUrl !== undefined) config.apkUrl = apkUrl;
      if (pwaUrl !== undefined) config.pwaUrl = pwaUrl;
      if (androidVersion) config.androidVersion = androidVersion;
      if (iosVersion) config.iosVersion = iosVersion;
      await config.save();
    }
    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la configuration." });
  }
};

module.exports = { getConfig, updateConfig };