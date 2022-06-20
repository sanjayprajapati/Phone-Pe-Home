const DeviceType = require("../models/DeviceType");
const DeviceId = require("../models/DeviceId");
const ErrorHandler = require("../utils/errorHandler");
const { isValidObjectId } = require("mongoose");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { getGeneratedDeviceId } = require("../utils/getGenratedDeviceId");
const RoomType = require("../models/RoomType");

// Create Device type

exports.createDeviceType = catchAsyncErrors(async (req, res, next) => {
  const name = req.body.name;
  const numberOfDevice = Number(req.body.numberOfDevice);

  if (!name || !numberOfDevice) {
    return next(new ErrorHandler("All Fields are required", 401));
  }
  if (numberOfDevice === NaN) {
    return next(new ErrorHandler("Device Type Must be a Number"), 401);
  }
  let devicetype = await DeviceType.findOne({ numberOfDevice });

  if (devicetype) {
    return next(new ErrorHandler("Already There"), 401);
  }

  if (numberOfDevice <= 0 || numberOfDevice > 8) {
    return next(new ErrorHandler("Device Type must a number between 0-9"));
  }

  devicetype = await DeviceType.create({
    name,
    numberOfDevice,
  });

  res
    .status(201)
    .json({ success: true, message: "Device Type Created Successfully" });
});

exports.createDeviceId = async (req, res, next) => {
  let { deviceTypeId } = req.body;

  if (!deviceTypeId) {
    return next(new ErrorHandler("Please Select Device Type", 401));
  }

  if (!isValidObjectId(deviceTypeId)) {
    return next(new ErrorHandler("Invalid device type", 401));
  }

  const deviceType = await DeviceType.findById(deviceTypeId);
  if (!deviceType) {
    return next(new ErrorHandler("Device type not found", 401));
  }

  const udId = await getGeneratedDeviceId();

  const deviceId = await DeviceId.create({
    deviceId: udId,
    deviceTypeId: deviceType._id,
  });

  await deviceId.save();

  res.status(201).json({
    success: true,
    message: "Device Id Created Successfully",
    deviceId,
  });
};

exports.createRoomType = catchAsyncErrors(async (req, res, next) => {
  const { roomnames } = req.body;

  if (!roomnames) {
    return next(new ErrorHandler("Please Enter Room Name", 401));
  }

  const roomtype = await RoomType.create({
    rooms: roomnames,
  });
  await roomtype.save();

  res.status(201).json({ success: true, message: "Rooms Type Created" });
});
