const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares");
const {Product, schemas} = require('../../models/Product')
const { User } = require("../../models/User");
const { createError, calculateCalories } = require("../../helpers");

router.post("/bloodtype/:bloodType", async (req, res, next) => {
    try {
        const {error} = schemas.getDataForBMR.validate(req.body);
        if(error){ 
            throw createError(400, error.message);
        }
        const {bloodType} = req.params;
        const products = await (await Product.find({}, '-__v')).filter(item => item.groupBloodNotAllowed[bloodType] === true);
        if(!products){
            throw createError(404)
        }
        const calories = calculateCalories(req.body)

        const result = {
            products: [...products].splice(0,10), 
            calories
        };
        res.json(result);
    } catch (error) {
        next(error);
    }
  });

router.post('/user/bloodtype/:bloodType', auth, async (req, res, next) => {
    try {
        const {error} = schemas.getDataForBMR.validate(req.body);
        if(error){ 
            throw createError(400, error.message);
        }
        const {bloodType} = req.params; 
        const {_id} = req.user; 
        const products = await (await Product.find({}, '-__v ')).filter(item => item.groupBloodNotAllowed[bloodType] === true);
        if(!products){
            throw createError(404)
        }
        const calories = calculateCalories(req.body)
        const parameters = {
            ...req.body,
            calories
        }
        const result = await User.findByIdAndUpdate(_id, {parameters}, {new: true});
        if(!result){
            createError(404);
        }
        const response = {
            products: [...products].splice(0,10), 
            calories
        }
        res.json(response);
    } catch (error) {
        next(error)
    }
})

module.exports = router;

