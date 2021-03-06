const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Order Schema
const AddressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  fullName:{
    type: String
  },
  phoneNumber:{
    type: String
  },
  email:{
    type: String
  },
  cityName:{
    type: String
  },
  stateName:{
    type: String
  },
  address:{
    type: String
  },
  pinCode:{
        type: String
  },
  landMark:{
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

module.exports = Mongoose.model('Address', AddressSchema);
