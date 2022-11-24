const express = require("express");

const router = express.Router();

const {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
} = require("../controllers/authController");

const verifyTokenCotroller = require("../controllers/verifyTokenController");

//register

router.post("/register", registerController);

//login user api

router.post("/login", loginController);

// forgot Password

router.post("/forgotpassword", forgotPasswordController);

// verify token
router.get("/verifyToken", verifyTokenCotroller);

//reset password
router.post("/resetpassword", resetPasswordController);

module.exports = router;
