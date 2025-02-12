const Questions = require("../../../models/question");
const QuestionPool = require("../../../models/questionPool");

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

// Create a new question pool
const createQuestionPool = async (req, res, next) => {
  try {
    const { questionTitle, mentorComments, aiComment, codeSnippet } = req.body;

    // Create a new question instance with provided data
    const newQuestion = new QuestionPool({
      questionTitle,
      mentorComments: mentorComments || [], // Default to an empty array if not provided
      aiComment,
      codeSnippet,
    });

    // Save the new question to the database
    const savedQuestion = await newQuestion.save();

    // Return the created question with a success status
    res.status(201).json(savedQuestion);
  } catch (error) {
    next(error); // Pass errors to the error handler
  }
};

// Get all question pools
const getAllQuestionPools = async (req, res, next) => {
  try {
    const allQuestionPools = await QuestionPool.find(); // Retrieve all question pools from the database
    res.status(200).json(allQuestionPools); // Return the retrieved question pools
  } catch (error) {
    next(error); // Pass errors to the error handler
  }
};

const updateQuestionPool = async (req, res) => {
  try {
    const { comment, mentorName, createdAt } = req.body; // Ensure you extract the correct fields

    const updatedQuestionPool = await QuestionPool.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          // Use $push to add to the mentorComments array
          mentorComments: {
            comment,
            mentorName,
            createdAt,
          },
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedQuestionPool) {
      return res.status(404).json({ message: "Question pool not found" });
    }

    res.status(200).json(updatedQuestionPool);
  } catch (error) {
    console.error("Error updating question pool:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to increase the user's score
const increaseUserScore = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.score += 20; // Increase the score by 20
    await user.save(); // Save the updated user
    return user; // Return the updated user
  } catch (error) {
    throw error; // Propagate the error
  }
};

module.exports = {
  getAllQuestions,
  getQuestion,
  createQuestion,
  createQuestionPool,
  getAllQuestionPools,
  updateQuestionPool,
  increaseUserScore,
};
