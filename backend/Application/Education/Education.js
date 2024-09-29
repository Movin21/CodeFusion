const Education = require('../../models/Education'); // Make sure to import your Education model

// Route to add education
router.post(
  "/add-education",
  validateToken, // Ensure the user is authenticated
  asyncHandler(async (req, res) => {
    const { schoolOrCollege, degree, department, startMonth, startYear, endMonth, endYear, description } = req.body;

    // Validate that the required fields are provided
    if (!schoolOrCollege || !degree || !department || !startMonth || !startYear || !endMonth || !endYear) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEducation = new Education({
      UserId: req.user.id, // Assuming you have the user ID from the validated token
      schoolOrCollege,
      degree,
      department,
      startMonth,
      startYear,
      endMonth,
      endYear,
      description,
    });

    await newEducation.save();
    res.status(201).json({ message: "Education added successfully", education: newEducation });
  })
);

router.get(
    "/geteducation",
    validateToken,
    asyncHandler(async (req, res) => {
      // Use the user ID from the validated token to fetch education records
      const educationRecords = await Education.find({ UserIdId: req.user.id });
      
      if (!educationRecords || educationRecords.length === 0) {
        return res.status(404).json({ message: "No education records found" });
      }
      
      res.status(200).json({ status: "Education records fetched", educationRecords });
    })
  );