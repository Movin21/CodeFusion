const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Assuming you have a User model
  },
  resume: {
    data: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
  },
}, { timestamps: true }); // Optional: Automatically create createdAt and updatedAt fields

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
