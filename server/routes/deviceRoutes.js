const express = require("express");
const {
  getAllDeviceByDeviceId,
  updateAllDeviceByDeviceId,
  getSingleDeviceById,
  updateSingleDeviceById,
} = require("../controllers/deviceController");

const router = express.Router();

router.route("/device/:id").get(getAllDeviceByDeviceId);
router.route("/device/update-all-device").put(updateAllDeviceByDeviceId);
router.route("/device/get-single-device/:id").get(getSingleDeviceById);
router.route("/device/update-single-device").put(updateSingleDeviceById);

// router.route("/resendOtp").get(resendOtp);
// router.route("/register/veifyotp").post(verifyOtp);
// router.route("/resetpassword").put(resetPassword);

module.exports = router;
