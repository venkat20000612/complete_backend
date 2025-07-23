const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,      // fixed spelling
    trim: true,
  },

  email: {
    type: String,
    required: true,      // fixed spelling
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,      // fixed spelling
  },

  resetPasswordToken: String,
    resetPasswordExpires: Date,

    // Wishlist: array of product/item IDs (strings or ObjectIds)
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }] // or use String if no Item model

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
