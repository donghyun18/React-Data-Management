const express = require('express');
const router = express.Router();
const Release = require('../models/Release');

router.post('/', async (req, res) => {
  try {
    const data = new Release(req.body);
    await data.save();
    res.json({ message: 'Release submission successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving Release data' });
  }
});

module.exports = router;
