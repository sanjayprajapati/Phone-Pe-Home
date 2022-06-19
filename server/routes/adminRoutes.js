const express = require("express");

const router = express.Router();

const {
  createDeviceType,
  createDeviceId,
} = require("../controllers/adminController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// Admin Routes

router
  .route("/admin/create-device-type")
  .post(isAuthenticatedUser, authorizeRoles("ADMIN"), createDeviceType);
router
  .route("/admin/create-device-id")
  .post(isAuthenticatedUser, authorizeRoles("ADMIN"), createDeviceId);

module.exports = router;
