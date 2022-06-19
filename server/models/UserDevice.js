const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserDeviceSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdminDevice",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Generating Device ID
UserDeviceSchema.methods.getDeviceId = function () {
  // Generating ID
};

module.exports = mongoose.model("Device", UserDeviceSchema);
