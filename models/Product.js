const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = Schema({
    categories: {
        type: Array,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    title: {
        type: Object,
        required: true
    },
    calories: {
        type: String,
        required: true
    },
    groupBloodNotAllowed:{
        type: Array,
        required: true
    }
});

const getDataForBMR = Joi.object({
    height: Joi.string().required(),
    age: Joi.string().required(),
    currentWeight: Joi.string().required(),
    desiredWeight: Joi.string().required(),
    bloodType: Joi.string().required()
})

const schemas = { getDataForBMR }


const Product = model("products", productSchema);

module.exports = { Product, schemas };
