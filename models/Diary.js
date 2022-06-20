const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = Schema({
  productId: { type: Schema.Types.ObjectId, ref: "products" },
  weight: {
    type: Number,
    default: 100,
  },
});

const diarySchema = Schema({
  productList: [productSchema],
  date: {
    type: Date,
    default: new Date(),
  },
  caloriesReceived: {
    type: Number,
    default: 0,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const schemaAdd = Joi.object({
  productId: Joi.string().required(),
  weight: Joi.number().required(),
  date: Joi.date().required(),
  owner: Joi.string().required(),
});

const schemaDelete = Joi.object({
  id: Joi.string().required(),
  date: Joi.date().required(),
  owner: Joi.string().required(),
});

const schemas = {
  add: schemaAdd,
  delete: schemaDelete,
};

const Diary = model("diary", diarySchema);

module.exports = {
  schemas,
  Diary,
};
