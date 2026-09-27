const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String }, // set once email is verified and account is completed
  isVerified: { type: Boolean, default: false }, // true once the email code has been confirmed
  verificationCode: { type: String },
  verificationCodeExpires: { type: Date }
});

module.exports = mongoose.model('User', userSchema);
