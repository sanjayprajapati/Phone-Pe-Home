const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const otpVerificationSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 300,
    default: Date.now(),
  },
});
otpVerificationSchema.pre("save", async function (next) {
  if (!this.isModified("token")) {
    next();
  }

  this.token = await bcrypt.hash(this.token, 12);
});
// JWT OTP TOKEN
otpVerificationSchema.methods.getOtpToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_VERIFICATION_SECRET, {
    expiresIn: process.env.JWT_VERIFICATION_EXPIRE * 60 * 1000,
  });
};

// Compare TOken

otpVerificationSchema.methods.compareToken = async function (enteredToken) {
  return await bcrypt.compare(enteredToken, this.token);
};

module.exports = mongoose.model("VerificationOtpToken", otpVerificationSchema);
