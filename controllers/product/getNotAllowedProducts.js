const {Product} = require("../../models/Product");
const { createError, calculateCalories } = require("../../helpers");

const getNotAllowedProducts = async (req, res, next) => {
    try {
      const { error } = schemas.getDataForBMR.validate(req.body);
      if (error) {
        throw createError(400, error.message);
      }
      const { bloodType } = req.params;
      const products = await (
        await Product.find({}, "-__v")
      ).filter((item) => item.groupBloodNotAllowed[bloodType] === true);
      if (!products) {
        throw createError(404);
      }
      const calories = calculateCalories(req.body);
  
      const result = {
        products: [...products].splice(0, 10),
        calories,
      };
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

module.exports = getNotAllowedProducts;
