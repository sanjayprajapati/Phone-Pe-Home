const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/sendToken");
const sendOtp = require("../utils/sendOtp");
const sendEmail = require("../utils/sendMail");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const otpGenerator = require("otp-generator");
const VerificationOtpToken = require("../models/VerificationOtpToken");
const sendVerificationToken = require("../utils/sendVerificationToken");
const { isValidObjectId } = require("mongoose");

// User Registration
exports.userRegister = catchAsyncErrors(async (req, res, next) => {
  const { name, email, mobile, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }
  user = await User.findOne({ email });
  if (user) {
    return next(
      new ErrorHandler(
        "Mobile no. is already registered with other account",
        400
      )
    );
  }

  user = await User.create({
    name,
    email,
    mobile,
    password,
  });
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  console.log(otp);
  const verificationOtpToken = new VerificationOtpToken({
    owner: user._id,
    token: otp,
  });

  await verificationOtpToken.save();
  await user.save();
  console.log(verificationOtpToken);

  await sendEmail({
    email,
    subject: `Verify your account`,
    message: `Your OTP is ${otp}`,
  });

  await sendOtp(otp, mobile);

  sendVerificationToken(
    res,
    user,
    201,
    "Verification code sent to your email and mobile"
  );
});

exports.verifyOtp = async (req, res) => {
  try {
    const { token } = req.body;
    const userId = req.user._id;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid OTP or has been Expired" });
    }
    if (user.verified) {
      return res
        .status(401)
        .json({ success: false, message: "Account already verified" });
    }

    const verifytoken = await VerificationOtpToken.findOne({ owner: user._id });

    if (!verifytoken) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid otp or has been expired" });
    }

    const isMatched = await verifytoken.compareToken(token);

    if (!isMatched) {
      return res.status(401).json({ success: false, message: "Wrong OTP" });
    }

    user.verified = true;

    await VerificationOtpToken.findByIdAndDelete(verifytoken._id);

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

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
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
