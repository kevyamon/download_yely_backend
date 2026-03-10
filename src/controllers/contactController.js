// src/controllers/contactController.js
const Contact = require('../models/Contact');
const { getIo } = require('../config/socket'); // Import de notre megaphone

// Lire uniquement les contacts actifs (Pour la Download Page publique)
const getActiveContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ isActive: true }).sort({ displayOrder: 1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la recuperation des contacts." });
  }
};

// Lire TOUS les contacts, meme inactifs (Pour ton Dashboard Admin)
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ displayOrder: 1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la recuperation de tous les contacts." });
  }
};

// Creer un nouveau contact (Admin)
const createContact = async (req, res) => {
  try {
    const { platform, url, iconName, displayOrder } = req.body;
    const contact = await Contact.create({ platform, url, iconName, displayOrder });
    
    // TEMPS REEL : On previent tout le monde qu'il y a un nouveau contact
    getIo().emit('contacts_updated');
    
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la creation du contact." });
  }
};

// Modifier un contact existant (Admin)
const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) return res.status(404).json({ message: "Contact introuvable." });
    
    // TEMPS REEL : On previent tout le monde qu'un contact a change
    getIo().emit('contacts_updated');
    
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la modification du contact." });
  }
};

// Supprimer definitivement un contact (Admin)
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact introuvable." });
    
    // TEMPS REEL : On previent tout le monde qu'un contact a ete supprime
    getIo().emit('contacts_updated');
    
    res.status(200).json({ message: "Contact supprime avec succes." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression." });
  }
};

module.exports = { getActiveContacts, getAllContacts, createContact, updateContact, deleteContact };