const sendOtp = (otp, phone, res, next) => {
  const sid = process.env.ACCOUNT_SID;
  const token = process.env.AUTH_TOKEN;
  const twilloNum = process.env.ACCOUNT_NUMBER;
  const twilio = require("twilio")(sid, token);

  twilio.messages
    .create({
      from: twilloNum,
      to: `+91${phone}`,
      body: `Your One Time Passwor is ${otp}. Do not share with anyone.`,
    })
    .then(function (res) {
      console.log("Otp send successfylly");
      res.json({ success: true, message });
    })
    .catch(function (err) {
      user.otp = undefined;
      user.otpExpire = undefined;

      user.save({ validateBeforeSave: false });
      console.log(err.message)
    });
};

module.exports = sendOtp;
