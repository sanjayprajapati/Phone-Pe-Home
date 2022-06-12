const express = require("express");

const router = express.Router();

const {
  userRegister,
  userLogin,
  verifyOtp,
  forgotPassword,
  resetPassword,
  resendOtp,
  logout,
  getUserDetails,
} = require("../controllers/userController");
const {
  isAuthenticatedUser,
  checkVerification,
} = require("../middlewares/auth");

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
// router.route("/forgotpassword").post(forgotPassword);
router.route("/verifyotp").post(checkVerification, verifyOtp);
// router.route("/resendOtp").get(resendOtp);
// router.route("/register/veifyotp").post(verifyOtp);
// router.route("/resetpassword").put(resetPassword);

module.exports = router;
