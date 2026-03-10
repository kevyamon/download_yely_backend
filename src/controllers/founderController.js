// src/controllers/founderController.js
const Founder = require('../models/Founder');
const { getIo } = require('../config/socket');

const getFounders = async (req, res) => {
  try {
    const founders = await Founder.find({}).sort({ displayOrder: 1 });
    res.status(200).json(founders);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la recuperation des fondateurs." });
  }
};

const createFounder = async (req, res) => {
  try {
    const { name, role, description, imageUrl, displayOrder } = req.body;
    const founder = await Founder.create({ name, role, description, imageUrl, displayOrder });
    
    getIo().emit('founders_updated');
    res.status(201).json(founder);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la creation du fondateur." });
  }
};

const updateFounder = async (req, res) => {
  try {
    const founder = await Founder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!founder) return res.status(404).json({ message: "Fondateur introuvable." });
    
    getIo().emit('founders_updated');
    res.status(200).json(founder);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la modification." });
  }
};

const deleteFounder = async (req, res) => {
  try {
    const founder = await Founder.findByIdAndDelete(req.params.id);
    if (!founder) return res.status(404).json({ message: "Fondateur introuvable." });
    
    getIo().emit('founders_updated');
    res.status(200).json({ message: "Fondateur supprime avec succes." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression." });
  }
};

module.exports = { getFounders, createFounder, updateFounder, deleteFounder };