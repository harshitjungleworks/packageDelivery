const express = require('express');
require('dotenv').config();
// const bodyParser = require('body-parser');
const port = process.env.PORT||3000;
const authRoutes = require('./routes/auth');

const app = express();


// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());

app.use(express.json());



// const sequelize = require('./util/database');

app.use(authRoutes);


// sequelize.sync().then(res =>{
//     console.log(res);

// })
// .catch(err=>{
//     console.log(err);
// })

app.listen(port,()=>{console.log(`listening at port ${port}`);});
