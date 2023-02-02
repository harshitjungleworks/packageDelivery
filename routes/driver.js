// get order details 

// set status payment pending 

const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driver');

router.post('/update',driverController.modifyStatus);




module.exports = router;