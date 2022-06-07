const express = require("express");

const router = express.Router();

const {
  userRegister,
  userLogin,
  verifyOtp,
} = require("../controllers/userController");

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/verifyotp").post(verifyOtp);

module.exports = router;
