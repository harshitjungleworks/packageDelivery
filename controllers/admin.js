
const User = require('../models/user');
const db = require('../util/database');
const jwt = require('jsonwebtoken');
const Product = require('../models/products');


exports.getAllProductsList = (req,res)=>{
    let token = req.headers.authorization;
    token = token.split(' ')[1];
 // console.log(token);
    let decodedToken;
    try{
       
       decodedToken = jwt.verify(token,'secret');
    }
       catch (err){
             res.statusCode = 400;
             res.send(err);
          }
 
       let phone_number = decodedToken.PhoneNumber;
    //    console.log(phone_number);
 
       User.getRecordByPhoneNumber(phone_number)
              .then(([data,metaData])=>{
                 data = data[data.length-1]; // getting object 
                 if (data.Designation === 'VERIFIED ADMIN'){
 
         // if admin is verified get all orders list from products table 

 
         Product.fetchAll()
         .then(([details,metaData])=>{
          res.statusCode = 200;
                res.send(details);
         })
         .catch(err=>{
          res.statusCode = 400;
                res.send(err);
                /// cant get orders list 
         })
 
                 }
              })
              .catch(err=>{
                res.statusCode = 400;
                res.send('UNABLE TO GET Your RECORD');
              });
 

}


exports.modifyProductStatus = (req,res)=>{
    console.log("frevnenr");
}