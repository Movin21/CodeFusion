const Questions = require("../../../models/question");

// Get all questions
const getAllQuestions = async (req, res, next) => {
  try {
    const allQuestions = await Questions.find(); // Corrected model name from 'auctions' to 'Questions'
    res.status(200).json(allQuestions); // Return the correct variable allQuestions instead of Questions
  } catch (error) {
    next(error);
  }
};

// Get a single question by ID
const getQuestion = async (req, res, next) => {
  try {
    const question = await Questions.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
};

// Create a new question
const createQuestion = async (req, res, next) => {
  try {
    const { name, endDate, difficulty, isArchived, description, constraints } =
      req.body;

    // Create a new question instance
    const newQuestion = new Questions({
      name,
      endDate,
      difficulty,
      isArchived: isArchived || false, // Default to false if not provided
      description,
      constraints,
    });

    // Save the new question to the database
    const savedQuestion = await newQuestion.save();

    // Return the created question with a success status
    res.status(201).json(savedQuestion);
  } catch (error) {
    next(error); // Pass errors to the error handler
  }
};

module.exports = {
  getAllQuestions,
  getQuestion,
  createQuestion,
};
