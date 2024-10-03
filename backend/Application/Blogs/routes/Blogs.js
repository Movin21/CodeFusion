const { createBlog, readAllBlogs, deleteBlog, updateBlog, readBlog } = require('../controllers/blogController.js');
const express = require("express");

// Create a new router
const blogsRouter = express.Router();

// POST to create a new blog
blogsRouter.route('/createBlog').post(createBlog);

// GET all blogs
blogsRouter.route('/readAllBlogs').get(readAllBlogs);

// GET a blog by ID
blogsRouter.route('/readBlog/:id').get(readBlog);

// DELETE a blog by ID
blogsRouter.route('/deleteBlog/:id').delete(deleteBlog);

// PUT to update a blog by ID
blogsRouter.route('/updateBlog/:id').put(updateBlog);

// Export the router
module.exports = blogsRouter;