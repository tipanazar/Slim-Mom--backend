const { Schema, model } = require("mongoose");

const productSchema = Schema({
  categories: {
    type: Array,
  },
  weight: {
    type: Number,
  },
  title: Schema({
    ru: {type : String,
        index: true
    },
    ua: {type : String,
        index: true
    }
  }),
  calories: {
    type: Number,
  },
  groupBloodNotAllowed: {
    type: Array,
  },
})

const Product = model("products", productSchema);

module.exports = {   
    Product
  }; 
