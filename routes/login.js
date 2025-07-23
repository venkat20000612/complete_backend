const express = require('express');
const bcrypt  = require('bcryptjs');
const User    = require('../models/User');
const router  = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please enter all fields' });
  }

  try {
    // 1️⃣ Always lowercase email before searching
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // 2️⃣ Ensure password is present (covers issue #3)
    if (!user.password) {
      console.error('User record missing hashed password');
      return res.status(500).json({ error: 'Server mis‑configuration' });
    }

    // 3️⃣ Compare plain vs hashed
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    return res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
