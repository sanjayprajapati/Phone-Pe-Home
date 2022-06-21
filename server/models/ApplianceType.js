const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const ApplianceTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Appliance Type"],
    unique: true,
  },
});

ApplianceTypeSchema.createIndex({ "a.loc": 1, "a.qty": 1 }, { unique: true });

// Generating Device ID
ApplianceTypeSchema.methods.getDeviceId = function () {
  // Generating ID
};

module.exports = mongoose.model("ApplianceType", ApplianceTypeSchema);
