const mongoose = require('mongoose');

const donateSchema = new mongoose.Schema({
  amount: Number,
  donationType: String,
  cardNumber: String 
});

module.exports = mongoose.model('Donate', donateSchema);
