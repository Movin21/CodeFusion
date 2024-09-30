const express = require('express');
const multer = require('multer');
const Resume = require('../../models/Resume'); // Adjust the path as needed
const router = express.Router();
const { validateToken } = require("../../middleware/tokenHandler");
// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/uploadResume',validateToken, upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const resumeBase64 = req.file.buffer.toString('base64');
        
        const newResume = new Resume({
            userId: req.user.id,
            resume: {
                data: resumeBase64,
                contentType: req.file.mimetype,
                filename: req.file.originalname,
            },
        });
        
        await newResume.save();
        res.status(200).json({ message: 'Resume uploaded successfully', resumeId: newResume._id });
    } catch (error) {
        console.error('Error uploading resume:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Endpoint to get the resume PDF by filename
router.get('/getResume/:savedResume', validateToken, async (req, res) => {
    try {
        const { savedResume } = req.params; // Get the resumeId from the request parameters
        

        // Optionally, if a key is passed in headers, you can access it like this:
        const accessKey = req.headers['x-access-key']; // Example of how to retrieve a custom access key

        // You can perform validation on the accessKey if needed
        if (!accessKey || accessKey !== 'YOUR_EXPECTED_KEY') {
            return res.status(403).send({ message: 'Forbidden: Invalid access key' });
        }

        // Find the resume for the user by resumeId
        const resume = await Resume.findOne({ _id: savedResume, userId :req.user.id});

        if (!resume) {
            return res.status(404).send({ message: 'Resume not found' });
        }

        // Send the resume data back to the client
        res.status(200).json({
            resumeId: resume._id,
            pdfUrl: resume.filePath, // Assuming you have a filePath field that stores the URL to the resume
            resumeName: resume.originalName, // Assuming you have an originalName field for the file
            visibility: resume.visibility,
        });
    } catch (error) {
        console.error("Error fetching resume:", error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

module.exports = router;


