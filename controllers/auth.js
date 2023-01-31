
let plivo = require('plivo');
let client = new plivo.Client();
const User = require('../models/user');
// const db = require('../util/database');
const jwt = require('jsonwebtoken');

exports.postSignup= (req,res)=>{

    //////  sending otp to user 
let code = Math.floor(100000 + Math.random() * 900000); // otp 
    client.messages.create({
            src: '+919877319473',
            dst: "+91"+`${req.body.PhoneNumber}`,
            text: `Hello ${req.body.Name}, your 6 digit otp verification code is ${code}`
        }
    ).then(function(message_created) {
        console.log(message_created)
        
    })
    .catch(err=>console.log(err));
    
////// checking if user is verified  


    // User.findByPhoneNumber(PhoneNumber)
    // .then(([data,meta]) => {
    //     console.log("data fetched from db")

    // }


//////// storing user data in db 
const user = new User(null,req.body.Name,req.body.Email,req.body.PhoneNumber,req.body.Country,req.body.State,req.body.City,req.body.ZipCode,code,req.body.Designation);
user.save().then(()=>{console.log(" user added")}).catch(err=>console.log(err))

// creating json web token 

// since phone number is unique  we can send it in token 
  const token = jwt.sign({PhoneNumber:req.body.PhoneNumber},
    'secret',{expiresIn:'9h'}
    );
    res.status(200).json({token:token,email:req.body.Email,PhoneNumber:req.body.PhoneNumber})

}



exports.postVerify= (req,res)=>{
    const Token = req.body.Token;
    

    // decodedToken =
    // decodedToken =
    decodedToken = jwt.verify(Token,'secret');
    // console.log(decodedToken);

    let otp = req.body.OTP;
    let PhoneNumber = decodedToken.PhoneNumber;
    // User.findByPhoneNumber(PhoneNumber);
    // console.log(PhoneNumber);

    User.findByPhoneNumber(PhoneNumber)
    .then(([data,meta]) => {
        console.log("data fetched from db")
///   multiple login are possible by user fetch the latest one 

        // console.log(data[data.length-1].OTP);
        let db_otp = data[data.length-1].OTP;
        if (db_otp === otp ){
            console.log("user correct");
        }
        else {
            console.log("unable to verify");
            // can make multiple attempts 
            // or delete record 
        }

    });
   
    // User.fetchAll()
    // .then(([data,meta]) => console.log(data));

    // console.log(result);


}



