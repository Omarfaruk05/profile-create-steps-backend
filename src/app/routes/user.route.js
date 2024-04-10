const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");

router.post("/signup", userController.singup);
router.post("/login", userController.login);
router.patch("/update", verifyToken, userController.updateUser);
router.get("/getMe", verifyToken, userController.getMe);

module.exports = router;
