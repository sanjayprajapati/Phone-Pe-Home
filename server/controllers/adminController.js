const DeviceType = require("../models/DeviceType");
const ErrorHandler = require("../utils/errorHandler");
const { isValidObjectId } = require("mongoose");

// Create Device type

exports.createDeviceType = async (req, res, next) => {
  const name = req.body.name;
  const deviceType = Number(req.body.deviceType);
  const userId = req.user.id;

  if (!name || !deviceType || !userId) {
    return next(new ErrorHandler("All Fields are required", 401));
  }

  let devicetype = await DeviceType.findOne({ deviceType });

  if (devicetype) {
    return next(new ErrorHandler("Already There"));
  }

  if (deviceType <= 0 || deviceType > 8) {
    return next(new ErrorHandler("Device Type must a number between 0-9"));
  }

  devicetype = await DeviceType.create({
    name,
    deviceType,
    userId,
  });

  res
    .status(201)
    .json({ success: true, message: "Device Type Created Successfully" });
};

exports.createDeviceId = async (req, res, next) => {
  const { name } = req.body;

  if (name === "" || name === null) {
    return next(new ErrorHandler("Please Enter Device Type", 401));
  }

  let devicetype = await DeviceType.findOne({ deviceType: name });

  if (devicetype) {
    return next(new ErrorHandler("Device Type already there"));
  }

  devicetype = await DeviceType.create({
    deviceType: name,
  });

  res
    .status(201)
    .json({ success: true, message: "Device Type Created Successfully" });
};
