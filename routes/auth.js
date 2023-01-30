
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')
//  /signup
router.post('/signup',authController.postSignup);


module.exports = router;