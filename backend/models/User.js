const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  score: {
    type: Number,
    default: 0,
  },
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
