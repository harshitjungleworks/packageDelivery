const express = require('express');
require('dotenv').config();
// const bodyParser = require('body-parser');
const port = process.env.PORT||3000;

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');
const driverRoutes = require('./routes/driver');

const app = express();

app.use(express.json());


app.use ('/admin',adminRoutes);
app.use(authRoutes);
app.use (productRoutes);
app.use ('/driver',driverRoutes);





// sequelize.sync().then(res =>{
//     console.log(res);

// })
// .catch(err=>{
//     console.log(err);
// })

app.listen(port,()=>{console.log(`listening at port ${port}`);});
