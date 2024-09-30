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

// Fetch resume
router.get('/getResume', validateToken, async (req, res) => {
    try {
        const resume = await Resume.findOne({ userId: req.user.id });
        if (!resume) return res.status(404).json({ message: 'No resume found' });

        res.json({ resumeId: resume._id, pdfUrl: resume.pdfUrl, resumeName: resume.resumeName });
    } catch (error) {
        console.error("Error fetching resume:", error);
        res.status(500).json({ message: 'Error fetching resume' });
    }
});

// Download resume by ID
router.get('/getResume/:savedResume', validateToken, async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.savedResume);
        if (!resume) return res.status(404).json({ message: 'Resume not found' });

        res.download(resume.pdfUrl, resume.resumeName);
    } catch (error) {
        console.error("Error downloading resume:", error);
        res.status(500).json({ message: 'Error downloading resume' });
    }
});

module.exports = router;


