const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const DeviceControlSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  deviceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "DeviceId",
  },
  deviceState: {
    type: Boolean,
    enum: ["ON", "OFF"],
    default: "OFF",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

// Generating Device ID
DeviceControlSchema.methods.getDeviceId = function () {
  // Generating ID
};

module.exports = mongoose.model("DeviceControl", DeviceControlSchema);
