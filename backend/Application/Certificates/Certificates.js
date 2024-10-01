const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Certificate = require('../../models/Certificate'); // Path to your Certificate model
const { validateToken } = require("../../middleware/tokenHandler");

// Add a new certificate
router.post(
  "/addCertificate",
  validateToken,
  asyncHandler(async (req, res) => {
    const { title, institution, issueDate, score } = req.body;

    // Validate required fields
    if (!title || !institution || !issueDate || !score) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Create new certificate entry
    const newCertificate = new Certificate({
      userId: req.user.id, // Assuming req.user is set by validateToken middleware
      title,
      institution,
      issueDate,
      score,
    });

    await newCertificate.save();
    res.status(201).json({ message: "Certificate added successfully", certificate: newCertificate });
  })
);

// Get all certificates for the authenticated user
router.get(
  "/getCertificates",
  validateToken,
  asyncHandler(async (req, res) => {
    const certificates = await Certificate.find({ userId: req.user.id });

    if (!certificates || certificates.length === 0) {
      return res.status(404).json({ message: "No certificates found" });
    }

    res.status(200).json({ status: "Certificates fetched successfully", certificates });
  })
);

// Delete a specific certificate by ID
router.delete(
  "/deleteCertificate/:id",
  validateToken,
  asyncHandler(async (req, res) => {
    const certificate = await Certificate.findOneAndDelete({ userId: req.user.id, _id: req.params.id });

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.status(200).json({ message: "Certificate deleted successfully" });
  })
);

module.exports = router;
