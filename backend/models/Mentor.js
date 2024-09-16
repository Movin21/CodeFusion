const mongoose = require("mongoose");

// Define the Mentor schema
const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
  expertise: {
    type: [String], // Array of expertise fields (e.g., ['Software Development', 'AI', 'DevOps'])
    required: true,
  },
  yearsOfExperience: {
    type: Number, // Total years of professional experience
    required: false,
    default: 0,
  },
  qualifications: {
    type: [String], // List of educational or professional qualifications (e.g., ['BSc in Computer Science', 'AWS Certified'])
    required: false,
  },
  currentCompany: {
    type: String, // Name of the current company (optional)
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Mentor model
const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
