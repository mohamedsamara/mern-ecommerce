const Mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { Schema } = Mongoose;

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120
};

Mongoose.plugin(slug, options);

// Product Schema
const ProductSchema = new Schema({
  sku: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    uppercase: true
  },
  name: {
    type: String,
    trim: true,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  imageKey: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  taxable: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    default: null
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Product', ProductSchema);
