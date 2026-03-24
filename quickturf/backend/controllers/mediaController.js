const Media = require('../models/Media');
const fs = require('fs');
const path = require('path');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const { type } = req.body;
    if (!['logo', 'partner', 'turf'].includes(type)) {
      return res.status(400).json({ success: false, message: 'Invalid type' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    const media = new Media({ type, imageUrl, filename: req.file.filename });
    await media.save();
    res.status(201).json({ success: true, data: media });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getImages = async (req, res) => {
  try {
    const { type } = req.query;
    const query = type ? { type } : {};
    const images = await Media.find(query).sort({ uploadedAt: -1 });
    res.json({ success: true, data: images });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ success: false, message: 'Not found' });
    const filePath = path.join(__dirname, '..', 'uploads', media.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    await Media.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
