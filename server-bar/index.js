const express = require('express');
const i18n = require('i18n');
const bodyParser = require('body-parser');
const connection = require('./src/db/connection');

//Routes
const userRoutes = require('./src/routes/user');
const productRoutes = require('./src/routes/product');
const languageRoutes = require('./src/routes/language');
const tableRoutes = require('./src/routes/table');
const statusRoutes = require('./src/routes/status');
const rolRoutes = require('./src/routes/rol');
const eventsRoutes = require('./src/routes/event');
const ordersRoutes = require('./src/routes/order');
const orderProductsRoutes = require('./src/routes/order-products');

const cors = require('cors');
const app = express();
const port = 3000;

// Configuration of i18n
i18n.configure({
    locales: ['en', 'es'],
    directory: __dirname + '/locals/',
    defaultLocale: 'en', 
    objectNotation: true 
});

app.use(i18n.init);

// Middleware de CORS
app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    next();
});

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/language', languageRoutes);
app.use('/products', productRoutes);
app.use('/tables', tableRoutes);
app.use('/state', statusRoutes);
app.use('/rols', rolRoutes);
app.use('/events', eventsRoutes);
app.use('/orders', ordersRoutes);
app.use('/order-products', orderProductsRoutes);

app.listen(process.env.PORT || port, () => {
    console.log(i18n.__('serverport') + ` ${port}`);
});

connection.connect(error => {
    if (error) throw error;
    console.log(i18n.__('connectionBD'));
});
