const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const rejx = /^[6789][0-9]{9}$/;
const otpGenerator = require("otp-generator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxlength: [50, "Can not exceed 50 characters"],
    minlength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your Email"],
    validate: [validator.isEmail, "Please enter a valid Email"],
  },
  mobile: {
    type: String,
    required: [true, "Please Enter your Mobile No."],
    match: [rejx, "Please enter a valid mobile no"],
  },
  mobileOtp: {
    type: String,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  userStatus: {
    type: String,
    enum: ["ACTIVE", "INACTIVE"],
    default: "ACTIVE",
  },
  otpExpire: Date,
});
UserSchema.index({ email: 1, mobile: 1 }, { unique: true });
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});
// JWT TOKEN
UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

UserSchema.methods.comparePassword = async function (enteredPpassword) {
  return await bcrypt.compare(enteredPpassword, this.password);
};

// Generating Password Reset Token
UserSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};
UserSchema.methods.generateOtp = function () {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
    lowerCaseAlphabets: false,
  });

  this.mobileOtp = otp;

  this.otpExpire = Date.now() + 1 * 60 * 1000;
};

module.exports = mongoose.model("User", UserSchema);
