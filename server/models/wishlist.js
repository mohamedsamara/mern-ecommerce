const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Wishlist Schema
const WishlistSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    default: null
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  isLiked: {
    type: Boolean,
    default: false
  },
  updated: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Wishlist', WishlistSchema);
