const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Merchant Schema
const MerchantSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  brand: {
    type: String
  },
  business: {
    type: String,
    trim: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'Waiting Approval',
    enum: ['Not Active', , 'Not Active', 'Waiting Approval', 'Rejected']
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Merchant', MerchantSchema);
