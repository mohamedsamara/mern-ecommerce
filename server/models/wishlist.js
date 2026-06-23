const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Wishlist Schema
const WishlistSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      default: null,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      required: true
    },
    isLiked: {
      type: Boolean,
      default: false
    },
    updated: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = Mongoose.model('Wishlist', WishlistSchema);
