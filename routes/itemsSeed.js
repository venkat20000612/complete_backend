// routes/itemsSeed.js
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.post('/', async (req, res) => {
    const items = [
        { title: "iPhone 14", description: "Apple Smartphone", price: 79999 },
        { title: "Laptop", description: "Dell 16GB RAM", price: 65999 },
        { title: "Shoes", description: "Nike Sports", price: 4999 },
    ];
    try {
        await Item.insertMany(items);
        res.send("Items seeded successfully");
    } catch (err) {
        res.status(500).json({ error: "Seeding failed" });
    }
});

module.exports = router;
