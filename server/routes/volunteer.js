const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');

router.post('/', async (req, res) => {
  try {
    const data = new Volunteer(req.body);
    await data.save();
    res.json({ message: 'Volunteer submission successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving Volunteer data' });
  }
});

module.exports = router;
