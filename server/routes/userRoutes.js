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
  createRoom,
  updateRoom,
  createHome,
  updateHome,
  addDevice,
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
router.route("/user/create-room").post(createRoom);
router.route("/user/update-room").put(updateRoom);
router.route("/user/create-home").post(createHome);
router.route("/user/update-home").put(updateHome);
router.route("/user/add-device").post(addDevice);

// router.route("/resendOtp").get(resendOtp);
// router.route("/register/veifyotp").post(verifyOtp);
// router.route("/resetpassword").put(resetPassword);

module.exports = router;
