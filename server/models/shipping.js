const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Order Schema
const ShippingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  address:{
    type: String
  },
  state:{
    type: String
  },
  country:{
    type: String
  },
  landMark:{
    type: String
  },
  zipCode:{
        type: String
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Shipping', ShippingSchema);
