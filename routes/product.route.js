const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller.js");

router.route("/product").post(productController.addProduct);

router.route("/product/:category").get(productController.getProduct);

module.exports = router;
