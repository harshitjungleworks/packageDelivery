
let plivo = require('plivo');
let client = new plivo.Client();

// const db = require('../util/database');

exports.postSignup= (req,res)=>{

    //////  sending otp to user 
const code = Math.floor(100000 + Math.random() * 900000); // otp 
// let client = new plivo.Client('MAMMVJMDU4YWJJNJZMZM', 'YWI5ZDBiZTcwOWUwZDBmYmQ0YzA4MzQxYzgzOWVj');
    client.messages.create({
            src: '+919877319473',
            dst: "+91"+`${req.body.PhoneNumber}`,
            text: `Hello ${req.body.name}, your 6 digit otp verification code is ${code}`
        }
    ).then(function(message_created) {
        console.log(message_created)
    });

    //////// storing user data in db 





}