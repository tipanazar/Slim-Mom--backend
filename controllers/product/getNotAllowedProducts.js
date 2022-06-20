const {Product} = require("../../models/Product");
const { createError } = require("../../helpers");

const getNotAllowedProducts = async (req, res, next) => {
  try {
    const groupBlood = req.params.groupBlood;
    
    if (!([1,2,3,4].find(el=>el == groupBlood))){        
        throw createError(404);
    }
    
    const result = await Product.find({groupBloodNotAllowed: { $in: [true] }}); //
    
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    console.log(error)
    next(error);
  }
};

module.exports = getNotAllowedProducts;
