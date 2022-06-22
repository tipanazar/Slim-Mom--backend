const express = require("express");

const { auth } = require("../../middlewares");

const ctrl = require("../../controllers/product");

const router = express.Router();

router.get("/search/:searchQuerry", ctrl.searchProducts);

router.get("/bloodtype/:bloodType", ctrl.getNotAllowedProducts);

router.post("/user/bloodtype/:bloodType",auth,  ctrl.getNotAllowedProducts);

module.exports = router;
