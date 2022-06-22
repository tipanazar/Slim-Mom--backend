const { Diary } = require("../../models/Diary");
const getProductsListbyId = require("../product/getProductsListbyId");
const { createError } = require("../../helpers");
const e = require("express");

const getDiaryInfo = async (req, res, next) => {
  try {
    const date = req.params.date;
    const owner = req.user._id;
    const result = await Diary.findOne({ date, owner });

    if (!result) {
      throw createError(404);
    }

    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getDiaryInfo;
