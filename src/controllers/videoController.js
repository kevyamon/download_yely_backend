// src/controllers/videoController.js
const Video = require('../models/Video');

// Lire uniquement les videos actives (Public)
const getActiveVideos = async (req, res) => {
  try {
    const videos = await Video.find({ isActive: true }).sort({ displayOrder: 1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la recuperation des videos." });
  }
};

// Lire TOUTES les videos (Admin)
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ displayOrder: 1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Ajouter une nouvelle video (Admin)
const createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, isActive, displayOrder } = req.body;
    const video = await Video.create({ title, description, videoUrl, isActive, displayOrder });
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de la video." });
  }
};

// Modifier une video (Admin)
const updateVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!video) return res.status(404).json({ message: "Video introuvable." });
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la modification." });
  }
};

// Supprimer une video (Admin)
const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ message: "Video introuvable." });
    res.status(200).json({ message: "Video supprimee avec succes." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression." });
  }
};

module.exports = { getActiveVideos, getAllVideos, createVideo, updateVideo, deleteVideo };