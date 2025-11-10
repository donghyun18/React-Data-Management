const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model
const bcrypt = require('bcryptjs');     // Import bcryptjs library for password hashing

router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body; // Extract data from request body

    // 1. Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please enter all required fields.' });
    }

    // 2. Check for existing email (prevent duplicate registrations)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    // 3. Hash the password
    // bcrypt.genSalt(10) generates a salt, a random string added to the password for security.
    // 10 is the number of rounds for salt generation (higher means more secure but slower).
    const salt = await bcrypt.genSalt(10);
    // bcrypt.hash(password, salt) hashes the provided password using the generated salt.
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create a new user instance with the hashed password
    const newUser = new User({
      name,
      email,
      password: hashedPassword // Store the hashed password
    });

    // 5. Save the user information to the database
    await newUser.save();

    // 6. Send success response
    res.status(201).json({ message: 'User registered successfully!' }); // Use 201 Created status
  } catch (error) {
    console.error("❌ Error during user registration:", error);
    res.status(500).json({ error: 'Server error during registration', details: error.message });
  }
});

module.exports = router;

