const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares");
const ctrl = require("../../controllers/product");
const postNotAllowedProducts = require("../../controllers/user/postNotAllowedProducts");

router.get("/search/:searchQuerry", ctrl.searchProducts);

router.post("/bloodtype/:bloodType", ctrl.getNotAllowedProducts);

router.post("/user/bloodtype/:bloodType", auth, postNotAllowedProducts);

module.exports = router;
