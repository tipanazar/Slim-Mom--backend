const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares");
const ctrl = require("../../controllers/product");

router.get("/search/:searchQuerry", ctrl.searchProducts);

router.post("/bloodtype/:bloodType", ctrl.getNotAllowedProducts);

router.post("/user/bloodtype/:bloodType", auth, ctrl.getNotAllowedProducts);

module.exports = router;
