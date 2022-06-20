const {Product} = require("../../models/Product");
const { createError } = require("../../helpers");

const searchProducts = async (req, res, next) => {
  try {
    const searchQuerry = req.params.searchQuerry;
    console.log(searchQuerry)
    const result = await Product.find().or(
        { title: { ua: { $text: /.*searchQuerry/  } } },
        { title: { ru: {  $text: /.*searchQuerry/ } } }
      )
      ;
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    console.log(error)
    next(error);
  }
};

module.exports = searchProducts;
