const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Review Schema
const ReviewSchema = new Schema({
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
  title: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
	  default: 0
  },
  review: {
    type: String,
    trim: true
  },
  isRecommended: {
    type: Boolean,
    default: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Review', ReviewSchema);
