const Mongoose = require('mongoose');

const { Schema } = Mongoose;

// Category Schema
const CategorySchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true
  },
  name: {
    type: String,
    trim: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    trim: true
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Category', CategorySchema);
