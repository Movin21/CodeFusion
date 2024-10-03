const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  imageUrl: { type: String, default: '' }, // URL of the image
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;