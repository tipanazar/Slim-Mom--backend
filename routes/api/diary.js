const express = require("express");
const ctrl = require("../../controllers/diary");

const { schemas } = require("../../models/Diary");
const { validation, auth } = require("../../middlewares");

const router = express.Router();

router.get("/:date", auth, ctrl.getDiaryInfo);

router.patch("/add", auth, validation(schemas.add), ctrl.addProduct);

router.patch("/delete", auth, validation(schemas.delete), ctrl.deleteProduct);

module.exports = router;
