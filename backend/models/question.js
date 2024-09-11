const mongoose = require("mongoose");

// Define the Question schema
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  codeSnippet: {
    type: String,
    required: true, // Optional if there's no code snippet
  },
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentor", // Reference to the Mentor model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Question model
const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
