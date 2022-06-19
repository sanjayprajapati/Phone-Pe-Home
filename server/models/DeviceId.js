const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const DeviceIdSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
  },
  deviceType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeviceType",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Hashing device id
DeviceIdSchema.pre("save", async function (next) {
  this.deviceId = await bcrypt.hash(this.deviceId, 12);
});

// Generating Device ID
DeviceTypeSchema.methods.getDeviceId = function () {
  // Generating ID
  return (
    new Date().getTime().toString(36) + Math.random().toString(36).slice(9)
  );
};

module.exports = mongoose.model("DeviceId", DeviceIdSchema);
