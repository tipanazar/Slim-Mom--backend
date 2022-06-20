const Diary = require("../../models/Diary");

const addProduct = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addProduct;