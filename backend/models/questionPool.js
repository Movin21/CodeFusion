const mongoose = require("mongoose");

// Define the QuestionPool schema
const questionPoolSchema = new mongoose.Schema({
  questionTitle: {
    type: String,
    required: true, // Ensure every question has a title
  },
  mentorComments: [
    {
      comment: {
        type: String,
        required: true, // If every comment needs to have content
      },
      mentorName: {
        type: String, // Optional: You can add a mentor name or ID
        required: false,
      },
      createdAt: {
        type: Date,
        default: Date.now, // Timestamp for each comment
      },
    },
  ],
  aiComment: {
    type: String,
    required: true, // AI-generated comment, assuming it must always be there
  },
  codeSnippet: {
    type: String,
    required: true, // Code associated with the question
  },
});

// Create the QuestionPool model
const QuestionPool = mongoose.model("QuestionPool", questionPoolSchema);

module.exports = QuestionPool;
