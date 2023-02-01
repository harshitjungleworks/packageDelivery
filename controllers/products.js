const db = require('../util/database');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');
const Product = require('../models/products');

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJQaG9uZU51bWJlciI6OTQxNzAwODUzOCwiaWF0IjoxNjc1MTYwMjQ0LCJleHAiOjE2NzUxOTI2NDR9.QMRrGi2Oimkf-B5K350Lb4a02n0kHXcivoBLHc6sbWU

exports.addProduct= (req,res)=>{
    //////// check user is verified by getting phone number and then checking if "verified user"
    let token = req.body.token;
    let decodedToken;
    try{
            decodedToken = jwt.verify(token,'secret');
            }
            catch (err){
               res.statusCode = 400;
               res.send('UNable to verify');
            }
            // console.log(decodedToken);

            let phone_number = decodedToken.PhoneNumber;

             Users.getRecordByPhoneNumber(phone_number)
             .then(([data,metaData])=>{
                data = data[data.length-1]; // getting object 
                if (data.Designation === 'VERIFIED USER'){

        // if user is verified store sent data to product table
        
   let status = "pending";
   let customer_id = data.id;
// console.log(null,req.body.type,req.body.weight,req.body.length,req.body.breadth,req.body.picture,req.body.pickup_address,req.body.drop_address,req.body.alternate_phone_number,status,customer_id);
   const product = new Product(null,req.body.type,req.body.weight,req.body.length,req.body.breadth,req.body.picture,req.body.pickup_address,req.body.drop_address,req.body.alternate_phone_number,status,customer_id);
product.save()
.then(result => console.log(result))
.catch(err=>console.log(err));

                }
                else {
                  res.statusCode = 400;
                  res.send('USER NOT VERIFIED');
                }
             })
             .catch(err=>{
               res.statusCode = 400;
               res.send('UNABLE TO ADD PARCEL');
             });

}

//// gets list of all orders placed by user 

exports.getOrdersList = (req,res)=>{

   let token = req.headers.authorization;
   token = token.split(' ')[1];

   let decodedToken;
   try{
      
      decodedToken = jwt.verify(token,'secret');
   }
      catch (err){
            res.statusCode = 400;
            res.send(err);
         }

      let phone_number = decodedToken.PhoneNumber;
      // console.log(phone_number);

      Users.getRecordByPhoneNumber(phone_number)
             .then(([data,metaData])=>{
                data = data[data.length-1]; // getting object 
                if (data.Designation === 'VERIFIED USER'){

        // if user is verified get orders list from products table 
        let customer_id = data.id;

        Product.getRecordByCustomerId(customer_id)
        .then(([data,metaData])=>console.log(data))

                }
             })
             .catch(err=>{
               res.statusCode = 400;
               res.send('UNABLE TO GET DETAILS');
             });

}



