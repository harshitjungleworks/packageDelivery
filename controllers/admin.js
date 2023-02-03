
const User = require('../models/user');
const db = require('../util/database');
const jwt = require('jsonwebtoken');
const Product = require('../models/products');
const Driver = require('../models/drivers');
const { LOADIPHLPAPI } = require('dns');

// var instance = new Razorpay({ key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_SECRET' })

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
             res.send(`unable to decode token or ${err}`);
          }
//  console.log(decodedToken);
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
                 else {
                  res.send('NOT A VERIFIED ADMIN')
                 }
              })
              .catch(err=>{
                res.statusCode = 400;
                res.send('UNABLE TO GET Your RECORD');
              });
 

}

/// works assuming user data is stored as a json 
function getDistance(x1, y1, x2, y2){
   let y = x2 - x1;
   let x = y2 - y1;
   console.log(Math.sqrt(x * x + y * y));
   return Math.sqrt(x * x + y * y);
}


////// accept and reject possible

///// SET COST 

/// send token in body also 


exports.modifyProductStatus = (req,res)=>{

   let token = req.body.token;
// console.log(token);
   let decodedToken;
   try{
      
      decodedToken = jwt.verify(token,'secret');
   }
      catch (err){
            res.statusCode = 400;
            res.send(`unable to decode token or ${err}`);
         }
// console.log(decodedToken);
      let phone_number = decodedToken.PhoneNumber;
      // console.log(phone_number);
// log
  
   User.getRecordByPhoneNumber(phone_number)
   .then(  ([data,metaData])=>{
      data = data[data.length-1]; // getting object 
      console.log(data);
      if (data.Designation === 'VERIFIED ADMIN'){


    let c_status = req.body.c_status;
    let order_id = req.body.order_id;

    //// reject case
    if (c_status === 'reject'){
        Product.setStatus(c_status ,order_id )
        .then(()=>{
         console.log("status updated")
         res.status(200).send('order rejected');
      })
        .catch(err => console.log(err))

    }

    // if "status is not reject "  ===> accept

    if (c_status === 'accept'){
      // check if free  deivers 
      Driver.getFreeDrivers()
      .then( ([driverData,md])=>{
         console.log(driverData);

         if (driverData.length === 0){
            res.status(400).send('No free Drivers');
         }
            /// if free drivers are available 
         else {
            // get products current location 

            let product_location = "30.72464358264908,76.84676889895219";
            // console.log(product_location);

            x1 = product_location.split(',')[0];
            y1 = product_location.split(',')[1];

            // console.log(x1,y1);

            let driver_id ;
            let distance =Number.MAX_VALUE;


//          

             // assigning driver 
            driverData.forEach(element => {
      

         //  console.log(element.location);

          let c = JSON.parse(element.location);
         //  console.log(c.lat);
               let  x2 = c.lat;
               let y2 = c.long;
               // console.log(x2,y2);
               ////// let distance - 
               if (distance > getDistance(x1,y1,x2,y2) ){
                  distance = getDistance(x1,y1,x2,y2);
                  driver_id = element.id;
               }
             });
            console.log(driver_id);

           

//       // generate tracking id 
      let tracking_id = Math.floor(Math.random() * 1000000000);


//  /// set in product table 
           Product.setIds(tracking_id,driver_id,order_id)
           .then(()=>console.log("product table update"))
           .catch(err=>res.send(`unable to update products db${err}`));

// //// set in driver table 
            
             Driver.setTrackingId(tracking_id,driver_id)
             .then(()=>{
               Driver.setStatus ('OUT',driver_id)
               .then(([a,b])=>{ 
                  console.log(a);
                   
                  Product.setStatus ('OUT',order_id)
                  .then(()=>{
                     let cost = 100 ;
                     Product.setCost(cost,order_id)
                     .then(()=>{res.status(200).send("ORDER PLACED")})
                     .catch(()=>{res.status(400).send('UNABLE TO SET COST to db')})
                     
               })
                  .catch(err=>console.log(err))
            }
               )
               .catch(err=>res.send(`unable to update drivers status db${err}`))
            
            })
             .catch(err=>res.send(`unable to update drivers db${err}`));

      // update order status and driver status 


    

         }

      })
      .catch((err)=>{
         console.log('unable to reach dB  or not entered drivers location add manually');
         res.status(400).send("unable to reach dB  or not entered drivers location add manually");
      })
    }
   
      }
      else {
         res.status(400).send('admin not verified');
      }
   })
      .catch((err)=>{res.status(400).send(`UNABLE TO FIND RECORD IN DB${err}`)
   // console.log(err);
   })
 
}

// verify if admin 
// check status - > payment pending 
// genrate link 

exports.generateLink = (req,res)=>{

   // console.log(req.body.order_id);
   // console.log(req.body.token);
   let token = req.body.token;
   let order_id = req.body.order_id;

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
                  // console.log("iberiov");
                  Product.getRecordByOrderId(order_id)
                  .then(([data,md])=>{
                     // console.log(data);
                     // console.log(data.c_status);
                     if (data[0].c_status == 'payment pending'){
                        console.log('generating payment limk.....');

                        // instance.paymentLink.create({
                        //    amount: data.cost,
                        //    currency: "INR",
                        //    description: "payment of order delivery",
                        //    customer: {
                        //      name: data.id,
                        //      contact: data.alternate_phone_number
                        //    },
                        //    notify: {
                        //      sms: true,
                        //    //   email: true
                        //    },
                        //    reminder_enable: true,
                        //    notes: {
                        //      policy_name: "Jeevan Bima"
                        //    },
                        //    callback_url: "https://example-callback-url.com/",
                        //    callback_method: "get"
                        //  })









                     }

                     else {
                        res.send("check order status");
                     }
                     


                  })
                  .catch((err)=>{
                     res.send(`unable to verify admin or ${err}`);
                  })
                }
               })
               .catch((err)=> res.send(`unable to verify admin or ${err}`));


}

