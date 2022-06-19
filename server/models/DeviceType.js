const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const DeviceTypeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please Enter Name of Device Type"],
  },
  deviceType: {
    type: Number,
    required: [true, "Please Select Device Type"],
    unique: true,
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
