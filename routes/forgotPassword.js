const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ error: 'No user with that email' });

        const token = crypto.randomBytes(32).toString('hex');
        const expireTime = Date.now() + 3600000; // 1 hour

        user.resetPasswordToken = token;
        user.resetPasswordExpires = expireTime;
        await user.save();

        // Setup nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'v24709884@gmail.com',
                pass: 'yovu bded ohey ritu' // Use App Password
            }
        });

        const resetUrl = `http://localhost:3000/reset-password/${token}`;

        const mailOptions = {
            to: user.email,
            from: 'your_email@gmail.com',
            subject: 'Password Reset Request',
            html: `<p>Click the link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) return res.status(500).json({ error: 'Error sending email' });
            res.json({ message: 'Reset link sent to email' });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
