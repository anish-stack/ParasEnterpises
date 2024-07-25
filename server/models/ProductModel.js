const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  ProductName: {
    type: String,
    required: true
  },
  Category: {
    type: String,
  },
  SmallDescription: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  DiscountPercentage: {
    type: Number,
    required: true
  },
  PriceAfterDiscount: {
    type: Number,
    required: true
  },
  HowManyStock: {
    type: Number,
    required: true
  },
  isStockOut: {
    type: Boolean,
    default: false
  },
  isLatestProduct: {
    type: Boolean,
    default: false
  },
  DataSheet: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  Specifications: [{
    title:{
      type:String,
    },
    details:{
      type:String,
    }
  }],
  MainImage: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  Tag:{
    type: String
  }
 
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
