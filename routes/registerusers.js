// routes/user.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { validateRegisterData } = require('../validators/userValidator');

const router = express.Router();

// @route   POST /register
router.post('/', async (req, res) => {
  const data = req.body;

  // Validate user input
  const errors = validateRegisterData(data);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ success: false, errors: { email: 'Email already exists' } });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create new user
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
