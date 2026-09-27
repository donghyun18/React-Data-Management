const mongoose = require('mongoose');

const releaseSchema = new mongoose.Schema({
  petName: String,
  age: Number,
  breed: String,
  gender: String,
  healthInformation: String,
  reasonForReleasing: String,
  // photo: String,
  agreedToTerms: Boolean
});

module.exports = mongoose.model('Release', releaseSchema);
