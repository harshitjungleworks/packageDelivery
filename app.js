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

// db.execute('SELECT*FROM users').then(res=>{
//     console.log(res[0]);
// })
// .catch(err=>{console.log(err);
// });
const authRoutes = require('./routes/auth');
const sequelize = require('./util/database');

app.use(authRoutes);


// sequelize.sync().then(res =>{
//     console.log(res);

// })
// .catch(err=>{
//     console.log(err);
// })

app.listen(port,()=>{console.log(`listening at port ${port}`);});
