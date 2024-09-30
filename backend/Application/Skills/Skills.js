
const express = require('express');
const router = express.Router();
const Skill = require('../../models/Skills'); // Adjust path according to your structure
const { validateToken } = require("../../middleware/tokenHandler");

// Fetch skills
router.get('/getskills', validateToken, async (req, res) => {
    try {
        const skills = await Skill.find({ userId: req.user.id });
        res.status(200).json({ skills });
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Add a new skill
router.post('/addskills', validateToken, async (req, res) => {
    const { skill } = req.body;
    
    if (!skill) {
        return res.status(400).json({ message: 'Skill is required' });
    }

    try {
        const newSkill = new Skill({ userId: req.user.id, skill });
        await newSkill.save();
        res.status(201).json({ message: 'Skill added successfully', skill: newSkill });
    } catch (error) {
        console.error('Error adding skill:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete a skill
router.delete('/deleteskills/:skill', validateToken, async (req, res) => {
    try {
        await Skill.findOneAndDelete({ userId: req.user.id, skill: req.params.skill });
        res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (error) {
        console.error('Error deleting skill:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
