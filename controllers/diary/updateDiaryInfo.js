const Diary = require("../../models/Diary");
const { createError } = require("../../helpers");
const { getProductsListbyId } = require("../product");

const updateDiaryInfo = async ({ owner, date, productList = [] }) => {
  try {
    let caloriesReceived = 0;

    if (productList?.length) {
      const productFullInfoList = await getProductsListbyId(
        productList.map(({ productId }) => productId)
      );

      if (productFullInfoList?.length) {
        for (let index = 0; index < productFullInfoList.length; index++) {
          const weight =
            productList.find(
              ({productId }) => productId === productFullInfoList[index]._id
            ).weight ?? 0;

          const caloriesCalc = Math.round(
            (weight / productFullInfoList[index].weight) *
              productFullInfoList[index].calories
          );
          if (caloriesCalc > 0) {
            caloriesReceived += caloriesCalc;
          }
        }
      }
    }

    const result = await Diary.findOneAndUpdate(
      { date, owner },
      { $set: { productList, caloriesReceived, owner, date } },
      { new: true, upsert: true }
    );
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateDiaryInfo;
