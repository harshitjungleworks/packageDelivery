// const express = require('express');
let plivo = require('plivo');


// const app = express();
let client = new plivo.Client();
// let client = new plivo.Client('<auth_id>', '<auth_token>');
// let client = new plivo.Client('MAMMVJMDU4YWJJNJZMZM', 'YWI5ZDBiZTcwOWUwZDBmYmQ0YzA4MzQxYzgzOWVj');
//const plivo = require("plivo");
exports.postSignup= (req,res)=>{
    // console.log(req.body.PhoneNumber);
    // res.send('recieved');

//let client = new plivo.Client();
const code = Math.floor(100000 + Math.random() * 900000);
// let client = new plivo.Client('MAMMVJMDU4YWJJNJZMZM', 'YWI5ZDBiZTcwOWUwZDBmYmQ0YzA4MzQxYzgzOWVj');
    client.messages.create({
            src: '+919877319473',
            dst: "+91"+`${req.body.PhoneNumber}`,
            text: 'Hello, your 6 digit otp verification code is '+`${code}`
        }

    ).then(function(message_created) {
        console.log(message_created)
    });
    // client.messages.create({
    //     src: '+919877319473',
    //     dst: '+919876802979',
    //     text: 'Hello, this is a sample text from Plivo',
    // }).then(function(response) {
    //     console.log(response)
    // });
}