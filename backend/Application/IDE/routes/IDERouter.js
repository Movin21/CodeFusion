const express = require("express");
const questionRouter = express.Router();

const {
  getAllQuestions,
  getQuestion,
  createQuestion,
  createQuestionPool,
  getAllQuestionPools,
  updateQuestionPool,
} = require("../application/IDEApplication");

// POST to create a new question
questionRouter.route("/createQuestion").post(createQuestion);

// GET all questions
questionRouter.route("/getAllQuestions").get(getAllQuestions);

// GET a question by ID
questionRouter.route("/getQuestion/:id").get(getQuestion);

//Post to create a new question pool
questionRouter.route("/createQuestionPool").post(createQuestionPool);

// GET all question pools
questionRouter.route("/getAllQuestionPools").get(getAllQuestionPools);

// Update a question pool
questionRouter.route("/updateQuestionPool/:id").put(updateQuestionPool);

module.exports = questionRouter;
