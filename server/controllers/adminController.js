const DeviceType = require("../models/DeviceType");
const DeviceId = require("../models/DeviceId");
const ErrorHandler = require("../utils/errorHandler");
const { isValidObjectId } = require("mongoose");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { getGeneratedDeviceId } = require("../utils/getGenratedDeviceId");
const RoomType = require("../models/RoomType");
const User = require("../models/User");

// Create Device type

exports.createDeviceType = catchAsyncErrors(async (req, res, next) => {
  const { name, applianceType } = req.body;
  let numOfAppliance = Number(applianceType[0].numberOfAppliance);
  let nameOfAppliance = applianceType[0].applianceName;

  if (!name || !nameOfAppliance) {
    return next(new ErrorHandler("All Fields are required", 401));
  }

  if (numOfAppliance === 0 || numOfAppliance === null) {
    return next(
      new ErrorHandler("Number of Applince must be a Number greater than 4"),
      401
    );
  }

  //let devicetype = await DeviceType.findOne({ numberOfDevice });

  // if (devicetype) {
  //   return next(new ErrorHandler("Already There"), 401);
  // }

  if (numOfAppliance <= 0 || numOfAppliance > 8) {
    return next(new ErrorHandler("Device Type must a number between 0-9", 401));
  }

  await DeviceType.create({
    name,
    applianceType,
  });

  res
    .status(201)
    .json({ success: true, message: "Device Type Created Successfully" });
});

exports.createDeviceId = async (req, res, next) => {
  let { deviceTypeId, userId } = req.body;

  if (!deviceTypeId || !userId) {
    return next(new ErrorHandler("Fields Required", 401));
  }

  if (!isValidObjectId(deviceTypeId)) {
    return next(new ErrorHandler("Invalid device type", 401));
  }

  if (!isValidObjectId(userId)) {
    return next(new ErrorHandler("Invalid Admin Id", 401));
  }

  const deviceType = await DeviceType.findById(deviceTypeId);
  if (!deviceType) {
    return next(new ErrorHandler("Device type not found", 401));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 401));
  }

  const udId = await getGeneratedDeviceId();

  const deviceId = await DeviceId.create({
    deviceId: udId,
    deviceTypeId: deviceType._id,
    assignedUser: user._id,
  });

  await deviceId.save();

  res.status(201).json({
    success: true,
    message: "Device Id Created Successfully",
    deviceId,
  });
};

exports.createRoomType = catchAsyncErrors(async (req, res, next) => {
  const { roomtype } = req.body;

  if (!roomtype) {
    return next(new ErrorHandler("Please Enter Room Type", 401));
  }

  const roomType = await RoomType.create({
    roomtype,
  });
  await roomType.save();

  res.status(201).json({ success: true, message: "Rooms Type Created" });
});
