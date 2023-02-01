
const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');


//  /add
// add a product to orders list 
router.post('/add',productController.addProduct);


// /list
// gets list of orders placed and thier status
router.get('/list',productController.getOrdersList);

module.exports = router;

