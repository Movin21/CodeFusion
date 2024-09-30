// models/Skill.js

const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    },
    skill: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Skill', SkillSchema);
