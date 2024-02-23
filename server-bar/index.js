//index.js
const express = require('express');
const i18n = require('i18n');
const bodyParser = require('body-parser');
const connection = require('./src/db/connection');
const userRoutes = require('./src/routes/user');
const productRoutes = require('./src/routes/product');
const eventsRoutes = require('./src/routes/event');
const cors = require('cors');
const app = express();
const port = 3000;


//configuration of i18n
i18n.configure({
    locales: ['en', 'es'], // list of supported languages
    directory: __dirname + '/locals/', // directory where the translation files are located
    defaultLocale: 'en', // default language
    objectNotation: true // allows you to use object notation to access translations
});


app.use(i18n.init);


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    next();
})


//midleware, this allow use json structure
app.use(bodyParser.json());


//all routes
app.use('/users', userRoutes); // mount the routes on '/users'
app.use('/products', productRoutes); // mount the routes on '/products'
app.use('/events', eventsRoutes); // mount the routes on '/events'


app.listen(process.env.PORT || port, () => {
    console.log(`Server on in port: ${port}`);
});


//connect bd
connection.connect(error => {
    if (error) throw error;
    console.log('connection success to DB!');
});
