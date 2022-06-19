const express = require('express')

const router = express.Router();

const {createDeviceType} = require('../controllers/adminController');

// Admin Routes

router.route('/admin').post(createDeviceType);

module.exports = router