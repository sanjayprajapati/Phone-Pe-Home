const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const DeviceTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name of Device Type"],
  },
  applianceType: [
    {
      applianceName: {
        type: String,
        required: true,
      },
      numberOfAppliance: {
        type: Number,
        required: [true, "Please Select Device Type"],
      },
    },
  ],
});
DeviceTypeSchema.index(
  { "applianceType.applianceName": 1, "applianceType.numberOfAppliance": 1 },
  { unique: true }
);

// Generating Device ID
DeviceTypeSchema.methods.getDeviceId = function () {
  // Generating ID
};

module.exports = mongoose.model("DeviceType", DeviceTypeSchema);
