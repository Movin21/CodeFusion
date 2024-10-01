const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date, // Use Date type for better control over date values
    required: true,
  },
  score: {
    type: Number, // Store score as a number
    required: true,
  },
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
