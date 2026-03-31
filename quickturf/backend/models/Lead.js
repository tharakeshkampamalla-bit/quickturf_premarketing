const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [80, 'Name must be under 80 characters']
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be a valid @gmail.com address']
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
  },
  city: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, 'City must be at least 2 characters'],
    maxlength: [60, 'City must be under 60 characters']
  },
  role: {
    type: String,
    required: true,
    enum: ['Player', 'Turf Owner', 'Collaborator']
  },
  turfName: {
    type: String,
    trim: true,
    validate: {
      validator(value) {
        return this.role !== 'Turf Owner' || (value && value.trim().length > 0)
      },
      message: 'Turf name is required for Turf Owners'
    }
  },
  location: {
    type: String,
    trim: true,
    validate: {
      validator(value) {
        return this.role !== 'Turf Owner' || (value && value.trim().length > 0)
      },
      message: 'Turf location is required for Turf Owners'
    }
  },
  investmentInterest: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);
