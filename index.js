require('dotenv').config();// Load enviroment variables
require('./database/connection'); // Start my DB connection
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT ?? 1234;
//App initialization
const app = express();

/******************* ROUTER INSTANCES *************************/
const productActions = require('./router/products');
const carActions = require('./router/cars');

/*************** MIDDLEWARES ****************/
//JSON Middleware
app.use(express.json());
//CORS to accept all origins
app.use(cors('*'));

//Routing endpoints
app.use('/products',productActions);
app.use('/cars', carActions);

app.listen(PORT,()=>{
    console.clear();
    console.log(`\n Node Server ready at http://localhost:${PORT} \n`);
})