const express = require('express');
const router = express.Router();
const Adoption = require('../models/Adoption');

router.post('/', async (req, res) => {
  console.log("📥 POST /adoption called with body:", req.body); 

  try {
    const data = new Adoption(req.body);
    await data.save();
    res.json({ message: 'Adoption submission successful' });
  } catch (error) {
    console.error("❌ Error saving adoption:", error); 
    res.status(500).json({ error: 'Error saving Adoption data' });
  }
});


module.exports = router;

