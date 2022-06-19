
const DeviceType = require('../models/DeviceType');
const ErrorHandler = require('../utils/errorHandler');

exports.createDeviceType = async(req,res)=> {
    const {deviceType} = req.body;

    if(!deviceType) {
        return next(new ErrorHandler("Please Enter Device Type", 401))
    }

    res.status(201).json({success: true,message:"Device Type Created Successfully"})
}