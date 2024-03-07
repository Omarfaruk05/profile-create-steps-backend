const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");

router.get("/:id", orderController.getAllOrders);
router.post("/", orderController.createOrder);
router.post("/success/:tranId", orderController.success);
router.post("/fail/:tranId", orderController.fail);
router.post("/cencel/:tranId", orderController.cencel);

module.exports = router;
