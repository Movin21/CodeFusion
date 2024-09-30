const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Education = require('../../models/Education');
const { validateToken } = require("../../middleware/tokenHandler");


router.post(
  "/addEducation",
  validateToken,
  asyncHandler(async (req, res) => {
    const { schoolOrCollege, degree, department, startMonth, startYear, endMonth, endYear, description, currentlyStudying } = req.body;

    if (!schoolOrCollege || !degree || !department || !startMonth || !startYear) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const newEducation = new Education({
      UserId: req.user.id,
      schoolOrCollege,
      degree,
      department,
      startMonth,
      startYear,
      endMonth,
      endYear,
      description,
      currentlyStudying,
    });

    await newEducation.save();
    res.status(201).json({ message: "Education added successfully", education: newEducation });
  })
);

router.get(
  "/geteducation",
  validateToken,
  asyncHandler(async (req, res) => {
    const educationRecords = await Education.find({ UserId: req.user.id });
    
    if (!educationRecords || educationRecords.length === 0) {
      return res.status(404).json({ message: "No education records found" });
    }
    
    res.status(200).json({ status: "Education records fetched", educationRecords });
  })
);

router.delete('/deleteEducation/:id', validateToken, async (req, res) => {
  try {
    const education = await Education.findOne({ _id: req.params.id, user: req.user.id });

    if (!education) {
      return res.status(404).json({ msg: 'Education record not found' });
    }

    await education.remove();

    res.json({ msg: 'Education record deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;