const Product = require("../../models/Product");
const { createError } = require("../../helpers");

const searchProducts = async (req, res, next) => {
  try {
    const searchQuerry = req.params.searchQuerry;
    const result = await Product.limit(20)
      .and(
        { title: { ua: { $regex: searchQuerry } } },
        { title: { ru: { $regex: searchQuerry } } }
      )
      .find();
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = searchProducts;
