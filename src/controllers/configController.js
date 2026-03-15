const AppConfig = require('../models/AppConfig');

const getConfig = async (req, res) => {
  try {
    let config = await AppConfig.findOne();
    if (!config) {
      config = await AppConfig.create({});
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la configuration' });
  }
};

const updateConfig = async (req, res) => {
  try {
    const { androidLink, iosLink, downloadCount, appScreenshots } = req.body;
    
    let config = await AppConfig.findOne();
    
    if (!config) {
      config = new AppConfig({
        androidLink,
        iosLink,
        downloadCount,
        appScreenshots
      });
    } else {
      config.androidLink = androidLink ?? config.androidLink;
      config.iosLink = iosLink ?? config.iosLink;
      config.downloadCount = downloadCount ?? config.downloadCount;
      config.appScreenshots = appScreenshots ?? config.appScreenshots;
    }

    await config.save();
    
    if (req.app.get('io')) {
      req.app.get('io').emit('configUpdated', config);
    }

    res.json(config);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la configuration' });
  }
};

module.exports = {
  getConfig,
  updateConfig
};