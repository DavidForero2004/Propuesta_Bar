const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./src/db/connection');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/user'); 
const productRoutes = require('./src/routes/product'); 
const eventsRoutes = require('./src/routes/event');
const app = express();
const port = 3000;

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

//midleware, this allow use json structure
app.use(bodyParser.json());

//All routes
app.use('/users', userRoutes); // mount the routes on '/users'
app.use('/products', productRoutes) // mount the routes on '/products'
app.use('/events', eventsRoutes) // mount the routes on '/events'

app.listen(process.env.PORT || port, () => {
    console.log(`Server on in port: ${port}`);
});

// Connect bd
connection.connect(error => {
    if (error) throw error;
    console.log('connection success to DB!');
});
