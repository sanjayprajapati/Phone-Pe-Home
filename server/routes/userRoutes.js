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

router.route("/user/signup").post(userRegister);
router.route("/user/verifyotp").post(verifyOtp);
router.route("/user/signin").post(userLogin);
router.route("/user/logout").get(logout);
router.route("/user/forget-password").post(forgotPassword);
router.route("/user/reset-password").put(resetPassword);
router.route("/user/me").get(isAuthenticatedUser, getUserDetails);

// router.route("/resendOtp").get(resendOtp);
// router.route("/register/veifyotp").post(verifyOtp);
// router.route("/resetpassword").put(resetPassword);

module.exports = router;
