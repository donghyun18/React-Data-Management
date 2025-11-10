const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key'; // Make sure this matches your .env if you moved it there

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('[DEBUG] Login attempt for email:', email);

    if (!email || !password) {
      console.log('[DEBUG] Missing email or password.');
      return res.status(400).json({ error: 'Please enter both email and password.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log('[DEBUG] User not found for email:', email);
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    console.log('[DEBUG] User found. Comparing passwords...');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('[DEBUG] Password mismatch for user:', email);
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    console.log('[DEBUG] Login successful for user:', email);

    // Generate JWT - INCLUDE user.name in the payload
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name }, // Payload: Added 'name' here
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: { id: user._id, name: user.name, email: user.email } // Ensure 'name' is sent in the user object
    });
  } catch (error) {
    console.error("❌ Error during user login:", error);
    res.status(500).json({ error: 'Server error during login', details: error.message });
  }
});

module.exports = router;
