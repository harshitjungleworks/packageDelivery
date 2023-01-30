const express = require('express');
require('dotenv').config();
// const bodyParser = require('body-parser');
const port = process.env.PORT||3000;

// const feedRoutes = require('./routes/feed');

const app = express();
app.use(express.json());

// app.use(bodyParser.urlencoded({extended:"false"})); // x-www-form-urlencoded <form>
// app.post(bodyParser.json()); // application/json

// app.post('/signup', (req,res)=>{
//     console.log(req.body);
// });

const authRoutes = require('./routes/auth');

app.use(authRoutes);
app.listen(port,()=>{console.log(`listening at port ${port}`);});