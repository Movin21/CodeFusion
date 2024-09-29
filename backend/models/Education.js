const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the student
    required: true,
  },
  schoolOrCollege: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
   
  },
  department: {
    type: String,
    required: true,
    
  },
  startMonth: {
    type: String,
    required: true,
  
  },
  startYear: {
    type: Number,
    required: true,
  },
  endMonth: {
    type: String,
    required: true,
    
  },
  endYear: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;
