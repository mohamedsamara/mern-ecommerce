const Mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { Schema } = Mongoose;

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120
};

Mongoose.plugin(slug, options);

// Brand Schema
const BrandSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    slug: {
      type: String,
      slug: 'name',
      unique: true,
      required: true
    },
    image: {
      data: Buffer,
      contentType: String
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500
    },
    isActive: {
      type: Boolean,
      default: true
    },
    merchant: {
      type: Schema.Types.ObjectId,
      ref: 'Merchant',
      default: null
    }
  },
  { timestamps: true }
);

module.exports = Mongoose.model('Brand', BrandSchema);
