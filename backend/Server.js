const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./DB Connection/DBConnection.js");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler.js");

//import Routes
const questionRouter = require("./Application/IDE/routes/IDERouter.js");
const blogsRouter = require("./Application/Blogs/routes/Blogs.js");

const app = express();

app.use(express.json());
app.use(cors());
connectDB();

//RouteMIddlewares
app.use("/questions", questionRouter);

app.use('/blogs',blogsRouter);

//error handler
app.use(errorHandler);
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on Port ${process.env.PORT || 5000}`);
});
