const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller.js");

router.route("/product").post(productController.addProduct);

router.route("/products/:category").get(productController.getProduct);
router.route("/stock/:category").get(productController.getStock);
router.route("/product/:id").get(productController.getProductById);

module.exports = router;
