const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { validateToken } = require("../../middleware/tokenHandler");

const saltRounds = 10;


router.post(
  "/login",
  asyncHandler(async (req, res) => {
    // console.log('Received login request:', req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found with email:", email);
      res.status(400);
      throw new Error("User not found");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log("Password mismatch for user:", email);
      res.status(400);
      throw new Error("Invalid password");
    }

    // Ensure token secret is set
    if (!process.env.ACCESS_TOKEN_SECRET) {
      console.log("ACCESS_TOKEN_SECRET is not set");
      throw new Error("Token secret is missing");
    }
       
    
    const token = jwt.sign(
      { user: { id: user._id, email: user.email } }, // Include necessary user data
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });//sending token
  })
);

router.post(
  "/add",
  asyncHandler(async (req, res) => {
    const { firstname, lastname, email, phone, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      firstname,
      lastname,
      email,
      phone,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json("User Added");
  })
);

router.get(
  "/get",
  validateToken,
  asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
  })
);

router.put(
  "/update/:id",
  validateToken,
  asyncHandler(async (req, res) => {
    const { firstname, lastname, email, phone } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstname, lastname, email, phone },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404);
      throw new Error("User not found");
    }
    res.status(200).json({ status: "User updated", user: updatedUser });
  })
);

router.delete(
  "/delete/:id",
  validateToken,
  asyncHandler(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404);
      throw new Error("User not found");
    }
    res.status(200).json({ status: "User deleted" });
  })
);

router.get(
  "/getuser",
  validateToken,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    res.status(200).json({ status: "User fetched", user });
  })
);



module.exports = router;
