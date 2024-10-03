const express = require("express");
const router = express.Router();
const User = require("../../../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { validateToken } = require("../../../middleware/tokenHandler");

const saltRounds = 10;

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400);
      throw new Error("Invalid password");
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error("Token secret is missing");
    }

    const token = jwt.sign(
      {
        user: {
          id: user._id,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      userData: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        country: user.country,
        role: user.role,
      },
    });
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
  "/update",
  validateToken,
  asyncHandler(async (req, res) => {
    const { firstname, lastname, phone } = req.body;

    // Use the user ID from the token (added by the validateToken middleware)
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, // No need to pass ID explicitly, it's taken from the token
      { firstname, lastname, phone },
      { new: true } // This option returns the updated document
    );

    if (!updatedUser) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({ status: "User updated", user: updatedUser });
  })
);

router.delete(
  "/delete",
  validateToken, // Ensure this middleware sets req.user with the authenticated user
  asyncHandler(async (req, res) => {
    // Assuming req.user contains the authenticated user's information
    const deletedUser = await User.findByIdAndDelete(req.user.id); // Use req.user.id to get the user
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
