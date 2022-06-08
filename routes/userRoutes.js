const express = require("express");

const router = express.Router();

const {
  userRegister,
  userLogin,
  verifyOtp,
  forgotPassword,
  resetPassword,
  resendOtp,
} = require("../controllers/userController");

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/forgotpassword").post(forgotPassword);
router.route("/verifyotp").post(verifyOtp);
router.route("/resendOtp").get(resendOtp);
router.route("/login/veifyotp").post(verifyOtp);
router.route("/register/veifyotp").post(verifyOtp);
router.route("/resetpassword").put(resetPassword);

module.exports = router;