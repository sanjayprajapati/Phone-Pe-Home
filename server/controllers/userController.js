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
const UserAccommodation = require("../models/UserAccommodation");

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
    const { userId, token } = req.body;

    if (!userId.trim() || !token.trim()) {
      return res.status(401).json({
        success: false,
        message: "Invalid Request, missing parameters!",
      });
    }
    if (!isValidObjectId(userId)) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid user id!" });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Sorry user not found!" });
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

    const useraccommodation = await UserAccommodation.create({
      userId: user._id,
    });
    await useraccommodation.save();

    sendToken(res, user, 200, "Account Verified");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// User login web with email password

exports.userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new ErrorHandler("Both fields are required!", 400));
    }

    let user = await User.findOne({ email: username });

    if (!user) {
      user = await User.findOne({ mobile: username }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Wrong credentials!", 401));
      }
      const isPasswordMatched = await user.comparePassword(password);
      //console.log("checked");
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Wrong credentials!", 401));
      }
      if (!user.verified) {
        return next(new ErrorHandler("User Not Verfied", 401));
      }
      sendToken(res, user, 200, "Login Success");
    } else {
      //console.log(user);
      user = await User.findOne({ email: username }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Wrong credentials!", 401));
      }
      if (!user.verified) {
        return next(new ErrorHandler("User Not Verfied", 401));
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
// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { username } = req.body;
  if (!username) {
    return next(new ErrorHandler("User not found", 400));
  }

  let user = await User.findOne({ email: username });

  if (!user) {
    user = await User.findOne({ mobile: username });
    if (!user) {
      return next(new ErrorHandler("User not found", 401));
    }
    if (!user.verified) {
      return next(new ErrorHandler("User Not Verfied", 401));
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let verificationOtpToken = new VerificationOtpToken({
      owner: user._id,
      token: otp,
    });

    await verificationOtpToken.save();
    sendOtp(otp, user.mobile);

    res.status(200).json({
      success: true,
      message: "Otp sent to your phone",
      user,
    });
  } else {
    //console.log(user);
    user = await User.findOne({ email: username });
    if (!user) {
      return next(new ErrorHandler("User Not found", 401));
    }
    if (!user.verified) {
      return next(new ErrorHandler("User Not Verfied", 401));
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let verificationOtpToken = new VerificationOtpToken({
      owner: user._id,
      token: otp,
    });

    await verificationOtpToken.save();

    await sendEmail({
      email: user.email,
      subject: `Reset Password OTP`,
      message: `Your Reset Password OTP is ${otp}`,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent to you email",
      user,
    });
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { userId, token, newPassword, confirmPassword } = req.body;

  if (!userId || !token || !newPassword || !confirmPassword) {
    return next(new ErrorHandler("Invalid Request, missing parameters!", 401));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not password", 401));
  }
  if (!isValidObjectId(userId)) {
    return next(new ErrorHandler("Invalid user id!", 401));
  }
  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandler("Sorry user not found!", 401));
  }
  if (!user.verified) {
    return next(new ErrorHandler("User Not Verfied", 401));
  }

  const verifytoken = await VerificationOtpToken.findOne({ owner: user._id });

  if (!verifytoken) {
    return next(new ErrorHandler("Invalid otp or has been expired", 401));
  }

  const isMatched = await verifytoken.compareToken(token);

  if (!isMatched) {
    return next(new ErrorHandler("Wrong OTP", 401));
  }

  user.password = newPassword;

  await VerificationOtpToken.findByIdAndDelete(verifytoken._id);

  await user.save();

  res
    .status(200)
    .json({ success: true, message: "Password reset fuccessfully" });
});
