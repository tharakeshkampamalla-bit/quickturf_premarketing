const Media = require('../models/Media');
const path = require('path');
const fs = require('fs');

// POST /api/upload
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { type, label } = req.body;
    const validTypes = ['logo', 'partner', 'turf'];
    if (!type || !validTypes.includes(type)) {
      // Clean up uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, message: 'Invalid media type. Must be: logo, partner, or turf' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const media = new Media({
      type,
      filename: req.file.filename,
      originalName: req.file.originalname,
      imageUrl,
      label: label || null,
      size: req.file.size,
      mimeType: req.file.mimetype
    });

    await media.save();

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: media
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: 'Upload failed' });
  }
};

// GET /api/images
exports.getImages = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const images = await Media.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// DELETE /api/images/:id
exports.deleteImage = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ success: false, message: 'Image not found' });

    // Delete file from disk
    const filePath = path.join(__dirname, '../uploads', media.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Media.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
