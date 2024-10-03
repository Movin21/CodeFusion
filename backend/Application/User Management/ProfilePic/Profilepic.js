const express = require('express');
const router = express.Router();
const Profile = require('../../../models/ProfilePic'); // Adjust the path as needed
const multer = require('multer');
const path = require('path');

// Multer configuration for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
const upload = multer({ storage: storage });

// Fetch user profile including image
router.get('/profilepic', async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.id); // Assuming user ID is from the token

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json({
      firstname: profile.firstname, // Adjust field names according to your schema
      lastname: profile.lastname,
      imageUrl: profile.imageUrl, // URL of the profile image
      // Include other profile details as needed
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Upload profile image
router.post('/uploadprofilepic', upload.single('image'), async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're using authentication middleware
    const profile = await Profile.findById(userId);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Update the profile with the new image URL
    profile.imageUrl = `/uploads/${req.file.filename}`; // Set the path to the uploaded image
    await profile.save();

    res.json({ imageUrl: profile.imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error });
  }
});
module.exports = router;