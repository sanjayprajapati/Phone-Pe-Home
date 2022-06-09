const User = require("../models/User");
const sendToken = require("../utils/jwtToken");
const otpGenerator = require("otp-generator");
const sendOtp = require("../utils/senOtp");
const sendEmail = require("../utils/sendMail");

// const auth_token = process.env.AUTH_TOKEN;

// const twilio = require("twilio")(
//   process.env.ACCOUNT_SID,
//   process.env.AUTH_TOKEN
// );

// User Registration
exports.userRegister = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;
    //console.log(sid);
    const user = await User.create({
      name,
      email,
      mobile,
      password,
    });

    req.user = user._id;

    user.generateOtp();

    await user.save();
    const otp = user.mobileOtp;

    sendOtp(otp, user.mobileOtp);
    res.status(200).json({
      success: true,
      message: "OTP sent to your mobile, please verify!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// User login web with email password

exports.userLogin = async (req, res, next) => {
  try {
    const { userDetail, password } = req.body;

    if (!userDetail || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Both fields are required!" });
    }

    let user = await User.findOne({ email: userDetail });

    if (!user) {
      user = await User.findOne({ mobile: userDetail }).select("+password");
      const isPasswordMatched = await user.comparePassword(password);
      //console.log("checked");
      if (!isPasswordMatched) {
        return res.status(401).json({
          success: false,
          message: "Wrong credentials!",
        });
      }
      // generate otp
      user.generateOtp();
      await user.save({ validateBeforeSave: false });
      sendOtp(user.mobileOtp, user.mobile);
      res.status(200).json({
        success: true,
        message: "OTP sent to your mobile, please verify!",
      });
    } else {
      //console.log(user);
      user = await User.findOne({ email: userDetail }).select("+password");

      const isPasswordMatched = await user.comparePassword(password);
      //console.log("checked");
      if (!isPasswordMatched) {
        return res.status(401).json({
          success: false,
          message: "Wrong credentials!",
        });
      }
      // generate otp
      user.generateOtp();
      await user.save({ validateBeforeSave: false });

      sendOtp(user.mobileOtp, user.mobile);

      res.status(200).json({
        success: true,
        message: "OTP sent to your mobile, please verify!",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// verify otp

exports.verifyOtp = async (req, res, next) => {
  try {
    const { mobileOtp } = req.body;
    if (!mobileOtp) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter otp!" });
    }

    const user = await User.findOne({
      mobileOtp,
      otpExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "OTP is invalid or has been expired!",
      });
    }

    user.mobileOtp = "";
    user.otpExpire = "";
    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Resend otp
exports.resendOtp = async (req, res, next) => {
  console.log("Jai ho");
  res.status(200).json({ success: true, message: "Route Working fine!" });
};

// forgot password

exports.forgotPassword = async (req, res, next) => {
  const { userDetail } = req.body;

  if (!userDetail) {
    return res
      .status(400)
      .json({ success: false, message: "Email/phone is required!" });
  }

  try {
    let user = await User.findOne({ email: userDetail });

    if (!user) {
      user = await User.findOne({ mobile: userDetail });
    }

    // generate otp
    user.generateOtp();
    await user.save({ validateBeforeSave: false });

    sendOtp(user.mobileOtp, user.mobile);

    res.status(200).json({
      success: true,
      message: "OTP sent to your mobile, please verify!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// reset password
exports.resetPassword = async (req, res, next) => {
  const { mobileOtp, newpassword, confirmPassword } = req.body;

  try {
    const user = await User.findOne({
      mobileOtp,
      otpExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "OTP is invalid or has been expired!",
      });
    }

    if (newpassword !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password does not match!" });
    }

    user.password = newpassword;
    user.mobileOtp = undefined;
    user.otpExpire = undefined;

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Password updated successfuly!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
