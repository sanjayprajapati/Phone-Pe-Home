const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/sendToken");
const sendOtp = require("../utils/sendOtp");
const sendEmail = require("../utils/sendMail");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const otpGenerator = require("otp-generator");

// User Registration
exports.userRegister = catchAsyncErrors(async (req, res, next) => {
  const { name, email, mobile, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }

  user = await User.findOne({ mobile });

  if (user) {
    return next(
      new ErrorHandler(
        "Mobile no. is already registered with other account",
        400
      )
    );
  }

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  console.log(otp);
  const otpExpire = new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000);

  user = await User.create({
    name,
    email,
    mobile,
    password,
    otp,
    otpExpire,
  });

  //sendOtp(otp, user.otp, "OTP sent please verify!");
  await sendEmail({
    email,
    subject: `Verify your account`,
    message: `Your OTP is ${otp}`,
  });

  await sendOtp(otp, mobile);

  res.status(201).json({
    success: true,
    message: "OTP sent to your email & phone, please verify your account",
  });
});

exports.verifyOtp = async (req, res) => {
  try {
    const otp = Number(req.body.otp);

    const user = await User.findOne({ otp, otpExpire: { $gt: Date.now() } });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP or has been Expired" });
    }

    user.verified = true;
    user.otp = null;
    user.otp_expiry = null;

    await user.save();

    sendToken(res, user, 200, "Account Verified");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// User login web with email password

exports.userLogin = async (req, res, next) => {
  try {
    const { userDetail, password } = req.body;

    if (!userDetail || !password) {
      return next(new ErrorHandler("Both fields are required!", 400));
    }

    let user = await User.findOne({ email: userDetail });

    if (!user) {
      user = await User.findOne({ mobile: userDetail }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Wrong credentials!", 401));
      }
      const isPasswordMatched = await user.comparePassword(password);
      //console.log("checked");
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Wrong credentials!", 401));
      }
      sendToken(res, user, 200, "Login Success");
    } else {
      //console.log(user);
      user = await User.findOne({ email: userDetail }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Wrong credentials!", 401));
      }
      const isPasswordMatched = await user.comparePassword(password);
      //console.log("checked");
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Wrong credentials!", 401));
      }

      sendToken(res, user, 200, "Login Success");
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
// // reset password
// exports.resetPassword = async (req, res, next) => {
//   const { otp, newpassword, confirmPassword } = req.body;

//   try {
//     const user = await User.findOne({
//       otp,
//       otpExpire: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP is invalid or has been expired!",
//       });
//     }

//     if (newpassword !== confirmPassword) {
//       return res.json({ success: false, message: "Password does not match!" });
//     }

//     user.password = newpassword;
//     user.otp = undefined;
//     user.otpExpire = undefined;

//     await user.save();
//     res.json({ success: true, message: "Password updated successfuly!" });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };
