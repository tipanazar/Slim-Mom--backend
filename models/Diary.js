const { Schema, model } = require("mongoose");
const Joi = require("joi");

const diarySchema = Schema({
  productList: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
  date: {
    type: Date,
    default: new Date()
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
    product: Joi.string().required(),
    date: Joi.date().required(),    
    owner: Joi.string().required(),
});

const schemaDelete = Joi.object({
    product: Joi.string().required(),
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
