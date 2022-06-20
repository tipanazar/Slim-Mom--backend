const express = require("express");

const { schemas } = require("../../models/Product");

const { validation } = require("../../middlewares");

const ctrl = require("../../controllers/product");

const router = express.Router();

router.get("/:searchQuerry", ctrl.searchProducts);

router.get("/:groupBlood", ctrl.getNotAllowedProducts);

module.exports = router;