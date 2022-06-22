  const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = Schema({
  _id: { type: Schema.Types.ObjectId, ref: "products" },
  weight: {
    type: Number,
    default: 100,
  },
  title: {
    type: String,
  },
  calories: {
    type: Number,
    default: 100,
  },
});

const diarySchema = Schema({
  productList: [productSchema],
  date: {
    type: String,
    require: [true, "Date is required"],
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
  date: Joi.string().required(),
  title: Joi.string(),
  caloriesBasic: Joi.number(),
});

const schemaDelete = Joi.object({
  _id: Joi.string().required(),
  date: Joi.string().required(),
  owner: Joi.string(),
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
