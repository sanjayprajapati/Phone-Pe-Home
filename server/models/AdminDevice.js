const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const AdminDeviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxlength: [50, "Can not exceed 50 characters"],
    minlength: [4, "Name should have more than 4 characters"],
  },
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

// Generating Device ID
AdminDeviceSchema.methods.getDeviceId = function () {
  // Generating ID
};

module.exports = mongoose.model("AdminDevice", AdminDeviceSchema);
