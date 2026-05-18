const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", authController.registerController);
router.post("/login", authController.loginController);
router.get("/get-me", authMiddleware.authUser, authController.getMe);
router.get("/logout", authController.logoutController);
module.exports = router;
