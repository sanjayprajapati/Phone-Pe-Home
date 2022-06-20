const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const DeviceIdSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    unique: true,
  },
  deviceTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeviceType",
    required: true,
  },
  assigned: {
    type: Boolean,
    default: false,
  },
  assignedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Hashing device id
// DeviceIdSchema.pre("save", async function (next) {
//   this.deviceId = await bcrypt.hash(this.deviceId, 12);

//   next();
// });

// Generating Device ID

module.exports = mongoose.model("DeviceId", DeviceIdSchema);
