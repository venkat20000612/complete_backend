const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Item = require('../models/Item');
const mongoose = require('mongoose');

// Add item to wishlist
router.post('/add', async (req, res) => {
    const { userId, itemId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
        return res.status(400).json({ error: 'Invalid item ID' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ error: 'User not found' });

        if (user.wishlist.includes(itemId)) {
            return res.status(400).json({ error: 'Item already in wishlist' });
        }

        user.wishlist.push(itemId);
        await user.save();

        res.json({ message: 'Item added to wishlist' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Remove item from wishlist
router.post('/remove', async (req, res) => {
    const { userId, itemId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.wishlist = user.wishlist.filter(id => id.toString() !== itemId);
        await user.save();

        res.json({ message: 'Item removed from wishlist' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get user's wishlist items
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('wishlist');
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json(user.wishlist);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
