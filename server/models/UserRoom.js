const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserRoomSchema = new mongoose.Schema({
  roomTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoomType",
    required: [true, "Room Type Id required"],
  },
  roomname: {
    type: String,
    required: [true, "Please Enter Room Names"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Generating Device ID
UserRoomSchema.methods.getDeviceId = function () {
  // Generating ID
};

module.exports = mongoose.model("UserRoom", UserRoomSchema);
