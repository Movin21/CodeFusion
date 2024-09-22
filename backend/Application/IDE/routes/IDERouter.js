const express = require("express");
const questionRouter = express.Router();

const {
  getAllQuestions,
  getQuestion,
  createQuestion,
} = require("../application/IDEApplication");

// POST to create a new question
questionRouter.route("/createQuestion").post(createQuestion);

// GET all questions
questionRouter.route("/getAllQuestions").get(getAllQuestions);

// GET a question by ID
questionRouter.route("/getQuestion/:id").get(getQuestion);

module.exports = questionRouter;
