const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String
  },
  image: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
