const Diary = require("../../models/Diary");
const updateDiaryInfo = require("./updateDiaryInfo");

const addProduct = async (req, res, next) => {
    console.log("Start")
  try {
    const owner = req.user._id;
    const { date, productId, weight } = req.body;
console.log(owner)
    let productList = [];
    const diaryInfo = await Diary.findOne({ date, owner });
    if (!diaryInfo) {
      throw createError(404);
    }
    productList = diaryInfo.productList;

    const indexProduct = productList.find((el) => el.productId === productId);
    if ((indexProduct = -1)) {
      productList = [...productList, { productId, weight }];
    } else {
      productList[indexProduct].weight += weight;
    }

    const result = await updateDiaryInfo({ owner, date, productList });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addProduct;
