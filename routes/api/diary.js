const express = require("express");

const { schemas } = require("../../models/Diary");

const { validation, auth } = require("../../middlewares");

const ctrl = require("../../controllers/diary");

const router = express.Router();

router.get("/:date", ctrl.getDiaryInfo);

router.patch("/add/", validation(schemas.add), ctrl.addProduct);

router.patch("/delete/", validation(schemas.delete), ctrl.deleteProduct);

module.exports = router;