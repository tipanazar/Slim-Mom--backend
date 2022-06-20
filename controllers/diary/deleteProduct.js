const Diary = require("../../models/Diary");
const updateDiaryInfo = require("./updateDiaryInfo");
const { createError } = require("../../helpers");

const deleteProduct = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const { date, id:productId } = req.body;

    let productList = [];
    const diaryInfo = await Diary.findOne({ date, owner });
    if (!diaryInfo) {
      throw createError(404);
    }
    productList = diaryInfo.productList.filter(el => el.productId !== productId);

    const result = await updateDiaryInfo({ owner, date, productList });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = deleteProduct;
