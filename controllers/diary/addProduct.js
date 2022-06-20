const { Types } = require("mongoose");
const { Diary } = require("../../models/Diary");
const { Product } = require("../../models/Product");
const updateDiaryInfo = require("./updateDiaryInfo");
const { createError } = require("../../helpers");

const addProduct = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const { date } = req.body;
    const productId = req.body.productId.toString();
    const weight = Number(req.body.weight) ?? 100;
    let productList = [];
    const diaryInfo = await Diary.findOne({ date, owner });

    if (!diaryInfo) {
      const result = await updateDiaryInfo({
        owner,
        date,
        productList: [{ productId, weight }],
      });
      res.status(201).json(result);
    } else {
      productList = diaryInfo?.productList ?? [];
      console.log(productList);
      const indexProduct = productList.findIndex((el) =>
        el.productId.toString() === productId.toString()
      );
      console.log(indexProduct);
      if (indexProduct === -1) {
        productList = [...productList, { productId, weight }];
      } else {
        productList[indexProduct].weight =
          productList[indexProduct].weight + weight ?? weight;
      }

      const result = await updateDiaryInfo({ owner, date, productList });
      res.status(201).json(result);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = addProduct;
