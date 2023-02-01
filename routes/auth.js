
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
// const isAuth = require('../middleware/is-auth');

//  /signup
router.post('/signup',authController.postSignup);


// /verify
router.post('/verify',authController.postVerify);

module.exports = router;