const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/sendToken");
const sendOtp = require("../utils/sendOtp");
const sendEmail = require("../utils/sendMail");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// User Registration
exports.userRegister = catchAsyncErrors(async (req, res, next) => {
  
    const { name, email, mobile, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const otp = Math.floor(Math.random * 1000000);

    user = await User.create({
      name,
      email,
      mobile,
      password,
      otp,
      otpExpire: Date.now() * process.env.OTP_EXPIRE * 60 * 1000
    });


    //sendOtp(otp, user.otp, "OTP sent please verify!");
    await sendEmail({
      email,
      subject: `Verify your account`,
      message: `Your OTP is ${otp}`,
    });

    await sendOtp(otp, mobile);

    res.status(201).json({success: true, message: "OTP sent to your email & phone, please verify your account"})

});

exports.verify = async (req, res) => {
  try {
    const otp = Number(req.body.otp);

    const user = await User.findById(req.user._id);

    if (user.otp !== otp || user.otp_expiry < Date.now()) {
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

// exports.userLogin = async (req, res, next) => {
//   try {
//     const { userDetail, password } = req.body;

//     if (!userDetail || !password) {
//       return res.json({ success: false, message: "Both fields are required!" });
//     }

//     let user = await User.findOne({ email: userDetail });

//     if (!user) {
//       user = await User.findOne({ mobile: userDetail }).select("+password");
//       if (!user) {
//         return res.json({
//           success: false,
//           message: "Wrong credentials!",
//         });
//       }
//       const isPasswordMatched = await user.comparePassword(password);
//       //console.log("checked");
//       if (!isPasswordMatched) {
//         return res.json({
//           success: false,
//           message: "Wrong credentials!",
//         });
//       }
//       sendToken(user, 200, res);
//     } else {
//       //console.log(user);
//       user = await User.findOne({ email: userDetail }).select("+password");
//       if (!user) {
//         return res.json({
//           success: false,
//           message: "Wrong credentials!",
//         });
//       }
//       const isPasswordMatched = await user.comparePassword(password);
//       //console.log("checked");
//       if (!isPasswordMatched) {
//         return res.json({
//           success: false,
//           message: "Wrong credentials!",
//         });
//       }

//       sendToken(user, 200, res);
//     }
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };
// verify otp

// exports.verifyOtp = async (req, res, next) => {
//   try {
//     const { otp } = req.body;
//     if (!otp) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Please Enter otp!" });
//     }

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

//     user.otp = "";
//     user.otpExpire = "";
//     await user.save();

//     sendToken(user, 200, res);
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // Resend otp
// exports.resendOtp = async (req, res, next) => {
//   console.log("Jai ho");
//   res.json({ success: true, message: "Route Working fine!" });
// };

// // forgot password

// exports.forgotPassword = async (req, res, next) => {
//   const { userDetail } = req.body;

//   if (!userDetail) {
//     return res.json({ success: false, message: "Email/phone is required!" });
//   }

//   try {
//     let user = await User.findOne({ email: userDetail });

//     if (!user) {
//       user = await User.findOne({ mobile: userDetail });
//     }

//     // generate otp
//     user.generateOtp();
//     await user.save({ validateBeforeSave: false });

//     sendOtp(user.otp, user.mobile, "OTP sent please verify");
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

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
