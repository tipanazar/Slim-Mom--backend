const Product = require("../../models/Product");
const { createError } = require("../../helpers");

const getProductsListbyId = async (productListId=[]) => {
  try {      
    const result = await Product.limit(50).find({ _id:{$in:productListId}});
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getProductsListbyId;