const express = require('express');
const multer = require('multer');
const Resume = require('../../../models/Resume'); // Adjust the path as needed
const router = express.Router();
const { validateToken } = require("../../../middleware/tokenHandler");
// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.put('/updateResume', validateToken, upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const resumeBase64 = req.file.buffer.toString('base64');

        const updatedResume = await Resume.findOneAndUpdate(
            { userId: req.user.id },
            {
                resume: {
                    data: resumeBase64,
                    contentType: req.file.mimetype,
                    filename: req.file.originalname,
                }
            },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: 'Resume updated successfully', resumeId: updatedResume._id });
    } catch (error) {
        console.error('Error updating resume:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Fetch resume
router.get('/getResume', validateToken, async (req, res) => {
    try {
        const resume = await Resume.findOne({ userId: req.user.id });
        if (!resume) return res.status(404).json({ message: 'No resume found' });

        res.json({
            resumeId: resume._id,
            resumeData: resume.resume.data,
            resumeName: resume.resume.filename,
            contentType: resume.resume.contentType
        });
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

        // Ensure the content type is set to PDF
        res.set('Content-Type', 'application/pdf');
        res.set('Content-Disposition', `attachment; filename="${resume.resume.filename}"`);
        
        // Convert base64 to Buffer and send
        const pdfBuffer = Buffer.from(resume.resume.data, 'base64');
        res.send(pdfBuffer);
    } catch (error) {
        console.error("Error downloading resume:", error);
        res.status(500).json({ message: 'Error downloading resume' });
    }
});
module.exports = router;

