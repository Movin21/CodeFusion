const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./DB Connection/DBConnection.js");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler.js");

// Import Routes
const questionRouter = require("./Application/IDE/routes/IDERouter.js");
const blogsRouter = require("./Application/Blogs/routes/Blogs.js");
const userRouter = require("./Application/User Management/User/User.js");
const educationRouter = require("./Application/User Management/Education/Education.js");
const skillsRoutes = require("./Application/User Management/Skills/Skills.js");
const resumeRoute = require("./Application/User Management/Resume/Resume.js");
const certificateroute = require("./Application/User Management/Certificates/Certificates.js");
const pic = require("./Application/User Management/ProfilePic/Profilepic.js");

// Correct path to dynamic content generation function
const dynamicContentGenerate = require("./Application/Blogs/controllers/dyanmicContentGeneration.js");

const app = express();

app.use(express.json());
app.use(cors());
connectDB();

/* Dynamic content generation */
setInterval(() => {
  dynamicContentGenerate();
  console.log("Dynamic Content Function Fetched!!");
}, 86400000); // Set to 24 hours

// Route Middlewares
app.use("/questions", questionRouter);
app.use("/blogs", blogsRouter);
app.use("/user", userRouter);
app.use("/Education", educationRouter);
app.use("/Skills", skillsRoutes);
app.use("/Resume", resumeRoute);
app.use("/Certi", certificateroute);
app.use("/pic", pic);

// Error handler middleware
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on Port ${process.env.PORT || 5000}`);
});
