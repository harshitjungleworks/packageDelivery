const express = require('express');
require('dotenv').config();
// const bodyParser = require('body-parser');
const port = process.env.PORT||3000;

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');


const app = express();

app.use(express.json());

app.use(authRoutes);
app.use (productRoutes);



// sequelize.sync().then(res =>{
//     console.log(res);

// })
// .catch(err=>{
//     console.log(err);
// })

app.listen(port,()=>{console.log(`listening at port ${port}`);});
