const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { sendVerificationEmail } = require('../utils/mailer');

const CODE_TTL_MS = 10 * 60 * 1000; // 10 minutes

// Same rule set the client checklist shows: 8+ chars, upper, lower, number, special char.
const PASSWORD_RULES = [
  { test: (pw) => pw.length >= 8, message: 'Password must be at least 8 characters long.' },
  { test: (pw) => /[A-Z]/.test(pw), message: 'Password must contain an uppercase letter.' },
  { test: (pw) => /[a-z]/.test(pw), message: 'Password must contain a lowercase letter.' },
  { test: (pw) => /[0-9]/.test(pw), message: 'Password must contain a number.' },
  { test: (pw) => /[^A-Za-z0-9]/.test(pw), message: 'Password must contain a special character.' }
];

function validatePassword(password) {
  const failed = PASSWORD_RULES.find((rule) => !rule.test(password || ''));
  return failed ? failed.message : null;
}

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
}

// STEP 1 — POST /signup/send-code
// Creates (or refreshes) a not-yet-verified user record and emails a 6-digit code.
router.post('/send-code', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Please enter your name and email.' });
    }

    const code = generateCode();
    const expires = new Date(Date.now() + CODE_TTL_MS);

    let user = await User.findOne({ email });

    if (user && user.isVerified) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    if (user) {
      // Re-sending a code to an unverified signup-in-progress
      user.name = name;
      user.verificationCode = code;
      user.verificationCodeExpires = expires;
      await user.save();
    } else {
      user = new User({ name, email, verificationCode: code, verificationCodeExpires: expires });
      await user.save();
    }

    try {
      await sendVerificationEmail(email, code);
    } catch (mailError) {
      console.error('❌ Failed to send verification email:', mailError);
      return res.status(500).json({
        error: 'Could not send verification email. Check the server EMAIL_USER / EMAIL_PASS configuration.'
      });
    }

    res.status(200).json({ message: 'Verification code sent to your email.' });
  } catch (error) {
    console.error('❌ Error during send-code:', error);
    res.status(500).json({ error: 'Server error while sending verification code.', details: error.message });
  }
});

// STEP 2 — POST /signup/verify-code
// Confirms the code the user typed in matches what was emailed, and marks the email verified.
router.post('/verify-code', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: 'Email and code are required.' });
    }

    const user = await User.findOne({ email });

    if (!user || !user.verificationCode) {
      return res.status(400).json({ error: 'No pending verification for this email. Please request a new code.' });
    }

    if (user.verificationCodeExpires < new Date()) {
      return res.status(400).json({ error: 'This code has expired. Please request a new one.' });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ error: 'Incorrect code. Please try again.' });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified.' });
  } catch (error) {
    console.error('❌ Error during verify-code:', error);
    res.status(500).json({ error: 'Server error while verifying code.', details: error.message });
  }
});

// STEP 3 — POST /signup
// Final step: only allowed once the email has been verified. Sets the password.
router.post('/', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'Please enter all required fields.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.status(400).json({ error: passwordError });
    }

    const user = await User.findOne({ email });

    if (!user || !user.isVerified) {
      return res.status(400).json({ error: 'Please verify your email before completing signup.' });
    }

    if (user.password) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.name = name;
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('❌ Error during user registration:', error);
    res.status(500).json({ error: 'Server error during registration', details: error.message });
  }
});

module.exports = router;
