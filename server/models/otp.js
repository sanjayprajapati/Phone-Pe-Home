const mongoose = require("mongoose");
const rejx = /^[6789][0-9]{9}$/;

const OtpSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
      required: [true, "Please Enter your Mobile No."],
      match: [rejx, "Please enter a valid mobile no"],
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      index: {
        expires: 300,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Otp", OtpSchema);
