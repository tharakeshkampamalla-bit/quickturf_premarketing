const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['logo', 'partner', 'turf'] },
  imageUrl: { type: String, required: true },
  filename: { type: String },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Media', mediaSchema);
