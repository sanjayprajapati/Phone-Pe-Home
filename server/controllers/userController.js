const User = require("../models/User");
const sendToken = require("../utils/jwtToken");
const otpGenerator = require("otp-generator");
const sid = process.env.ACCOUNT_SID || "AC51b9621ee0bb5af27c7fe885fac8ff31";
const auth_token = process.env.AUTH_TOKEN || "ed8e3f1e223ac2fe3f66301427264fe8";
console.log(sid);
const twilio = require("twilio")(sid, auth_token);

// User Registration
exports.userRegister = async (req, res, next) => {
  try {
    const { name, email, mobile } = req.body;
    console.log(req.body);

    const user = await User.create({
      name,
      email,
      mobile,
    });

    req.user = user._id;
    console.log(req.user);

    user.generateOtp();

    await user.save();
    const otp = user.mobileOtp;

    twilio.messages
      .create({
        from: "+18632165147",
        to: `+91${mobile}`,
        body: `Your One Time Passwor is ${otp}. Please do not share with anyone.`,
      })
      .then(function (res) {
        console.log("messages send successfylly");
      })
      .catch(function (err) {
        user.mobileOtp = undefined;
        user.otpExpire = undefined;

        user.save({ validateBeforeSave: false });
        console.log(err);
      });

    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// User login web with email password

exports.userLogin = async (req, res, next) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      res.status(400).json({ success: false, message: "Invailid Mobile no." });
    }

    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "User not registered with this mobile no. Please Register first.",
      });
    }
    // generate otp
    user.generateOtp();
    await user.save({ validateBeforeSave: false });

    const otp = user.mobileOtp;
    twilio.messages
      .create({
        from: "+18632165147",
        to: `+91${mobile}`,
        body: `Your One Time Passwor is ${otp}. Please do not share with anyone.`,
      })
      .then(function (res) {
        console.log("messages send successfylly");
      })
      .catch(function (err) {
        user.mobileOtp = undefined;
        user.otpExpire = undefined;

        user.save({ validateBeforeSave: false });
        console.log(err);
      });

    sendToken(user, 200, res);
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
        .json({ success: false, message: "Please Enter otp" });
    }

    const user = await User.findOne({ mobileOtp });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invailid Otp",
      });
    }
    const expiredOtp = user.otpExpire;
    if (expiredOtp < Date.now()) {
      return res.status(401).json({
        success: false,
        message: "Otp Expired!",
      });
    }

    user.mobileOtp = "";
    user.otpExpire = "";
    await user.save();

    res.status(200).json({
      success: true,
      message: "Otp Verification Successfull.",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
