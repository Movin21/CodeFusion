const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./DB Connection/DBConnection.js");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler.js");

//import Routes
const questionRouter = require("./Application/IDE/routes/IDERouter.js");
const userRouter=require("./Application/User/User.js");
const educationRouter=require("./Application/Education/Education.js")
const skillsRoutes = require('./Application/Skills/Skills.js');
const app = express();

app.use(express.json());
app.use(cors());
connectDB();

//RouteMIddlewares
app.use("/questions", questionRouter);
app.use("/user",userRouter);
app.use("/Education",educationRouter);
app.use("/Skills",skillsRoutes);

//error handler
app.use(errorHandler);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on Port ${process.env.PORT || 3000}`);
});
