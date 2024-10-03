const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
    type: String,
    required: true,
  },
  endMonth: {
    type: String,
  },
  endYear: {
    type: String,
  },
  description: {
    type: String,
    default: '',
  },
  currentlyStudying: {
    type: Boolean,
    default: false,
  },
});

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;