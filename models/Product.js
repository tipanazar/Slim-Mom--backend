const { Schema, model } = require("mongoose");

const productSchema = Schema({
  categories: {
    type: Array,
  },
  weight: {
    type: Number,
  },
  title: {
    type: Object,
  },
  calories: {
    type: Number,
  },
  groupBloodNotAllowed: {
    type: Array,
  },
})

const Product = mongoose.model('product', productSchema)
module.exports = Product