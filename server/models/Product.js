const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    brand: {
      type: String,
      required: [true, 'Product brand is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      index: true,
      lowercase: true
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative']
    },
    originalPrice: {
      type: Number,
      default: function () {
        return this.price;
      }
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5
    },
    reviewCount: {
      type: Number,
      default: 0
    },
    images: {
      type: [String],
      required: [true, 'At least one product image is required']
    },
    description: {
      type: String,
      required: [true, 'Product description is required']
    },
    specifications: {
      type: Map,
      of: String
    },
    stock: {
      type: Number,
      required: true,
      default: 20,
      min: [0, 'Stock cannot be negative']
    },
    colors: [String],
    sizes: [String],
    featured: {
      type: Boolean,
      default: false,
      index: true
    },
    trending: {
      type: Boolean,
      default: false,
      index: true
    },
    inStock: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Indexes for fast searching & filtering
productSchema.index({ name: 'text', brand: 'text', description: 'text' });
productSchema.index({ price: 1, rating: -1 });

module.exports = mongoose.model('Product', productSchema);
