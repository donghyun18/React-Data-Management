const express = require('express');
const router = express.Router();
const Donate = require('../models/Donate');

router.post('/', async (req, res) => {
  try {
    const data = new Donate(req.body);
    await data.save();
    res.json({ message: 'Donate submission successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving Donate data' });
  }
});

module.exports = router;
