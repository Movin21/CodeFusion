const mongoose = require("mongoose");

// Define the Question schema
const questionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  isArchived: {
    type: Boolean,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  constraints: {
    type: String,
    required: true,
  },
});

// Create the Question model
const Questions = mongoose.model("Question", questionSchema);

module.exports = Questions;
