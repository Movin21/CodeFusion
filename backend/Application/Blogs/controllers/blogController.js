const Blogs = require("../../../models/blogsModel");

// Create a blog
const createBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    // Create a new blog instance
    const newBlog = new Blogs({
      title,
      content,
    });

    // Save the new blog to the database
    const savedBlog = await newBlog.save();

    // Return the created blog with a success status
    res.status(201).json(savedBlog);
  } catch (error) {
    next(error); // Pass errors to the error handler
  }
};

// Read All Blogs
const readAllBlogs = async (req, res, next) => {
  try {
    const allBlogs = await Blogs.find(); // Retrieve all blogs from the database
    res.status(200).json(allBlogs);
  } catch (error) {
    next(error);
  }
};

// Delete a Blog
const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the blog by ID and delete it
    const deletedBlog = await Blogs.findByIdAndDelete(id);

    // Return the deleted blog with a success status
    res.status(200).json(deletedBlog);
  } catch (error) {
    next(error);
  }
};

// Update a Blog
const updateBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    // Find the blog by ID and update it
    const updatedBlog = await Blogs.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true } // Return the updated document
    );

    // Return the updated blog with a success status
    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

// Read a single blog
const readBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the blog by ID
    const blog = await Blogs.findById(id);
    res.status(200).json(blog);
    } catch (error) {
    next(error);
    }
};

module.exports = {
    createBlog,
    readAllBlogs,
    deleteBlog,
    updateBlog,
    readBlog
}
