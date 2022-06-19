const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const DeviceTypeSchema = new mongoose.Schema({
  deviceType: {
    type: String,
    required: [true,"Please Enter Device Type"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Generating Device ID
DeviceTypeSchema.methods.getDeviceId = function () {
  // Generating ID
};

module.exports = mongoose.model("DeviceType", DeviceTypeSchema);
