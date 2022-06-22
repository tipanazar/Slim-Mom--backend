const { Schema, model } = require("mongoose");
const Joi = require("joi");


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
    
const getDataForBMR = Joi.object({
  height: Joi.string().required(),
  age: Joi.string().required(),
  currentWeight: Joi.string().required(),
  desiredWeight: Joi.string().required(),
  bloodType: Joi.string().required(),
});

const schemas = { getDataForBMR };

const Product = model("products", productSchema);

module.exports = { Product, schemas };
