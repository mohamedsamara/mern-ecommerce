const Mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { Schema } = Mongoose;

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120
};

Mongoose.plugin(slug, options);

// Cart Schema
const CartSchema = new Schema({
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  quantity: Number
});

module.exports = Mongoose.model('Cart', CartSchema);
