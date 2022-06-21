//

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const DeviceControl = require("../models/DeviceControl");
const ErrorHandler = require("../utils/errorHandler");

exports.getAllDeviceByDeviceId = catchAsyncErrors(async (req, res, next) => {
  const deviceId = req.params.id;
  const device = await DeviceControl.find({ deviceId });
  if (!device) {
    return next(new ErrorHandler("Data not found"));
  }

  res.status(200).json({ success: true, message: "All devices found", device });
});
exports.updateAllDeviceByDeviceId = catchAsyncErrors(async (req, res, next) => {
  const { deviceId, deviceState } = req.body;

  let device = await DeviceControl.updateMany(
    {
      deviceId,
    },
    {
      $set: {
        deviceState,
      },
    }
  );

  device = await DeviceControl.find({ deviceId });

  res
    .status(200)
    .json({ success: true, message: "All devices updated", device });
});

exports.getSingleDeviceById = catchAsyncErrors(async (req, res, next) => {
  const device = await DeviceControl.findById(req.params.id);
  if (!device) {
    return next(new ErrorHandler("Data not found", 401));
  }

  res.status(200).json({ success: true, message: "Device Found", device });
});

exports.updateSingleDeviceById = catchAsyncErrors(async (req, res, next) => {
  const { Id, deviceState } = req.body;
  const device = await DeviceControl.findById(Id);

  if (!device) {
    return next(new ErrorHandler("Data Not Found", 401));
  }

  device.deviceState = deviceState;

  await device.save();
  res.status(200).json({ success: true, message: "Device Updated", device });
});
