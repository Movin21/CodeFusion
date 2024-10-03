const mongoose = require("mongoose");

// Define the blogs schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
});

// Create the Blogs model
const Blogs = mongoose.model("Blogs", blogSchema);

module.exports = Blogs;