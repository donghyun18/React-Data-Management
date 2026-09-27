const mongoose = require('mongoose');

const AdoptionSchema = new mongoose.Schema({
  name: String,
  email: String,
  preferredPet: String
});

const Adoption = mongoose.model('Adoption', AdoptionSchema);

module.exports = Adoption;

