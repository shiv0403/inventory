const express = require("express");
const { verifyEmailController } = require("../controllers/emailController");

const router = express.Router();

//verify email

router.get("/verify", verifyEmailController);

module.exports = router;
