const Mongoose = require('mongoose');

const { REVIEW_STATUS } = require('../constants');

const { Schema } = Mongoose;

// Review Schema
const ReviewSchema = new Schema({
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
  title: {
    type: String,
    trim: true,
    trquired: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 1,
    max: 5,
    required: true
  },
  review: {
    type: String,
    trim: true,
    required: true
  },
  isRecommended: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    default: REVIEW_STATUS.Waiting_Approval,
    enum: [
      REVIEW_STATUS.Waiting_Approval,
      REVIEW_STATUS.Rejected,
      REVIEW_STATUS.Approved
    ]
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Review', ReviewSchema);
