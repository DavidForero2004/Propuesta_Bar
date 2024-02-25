const express = require('express');
const i18n = require('i18n');
const bodyParser = require('body-parser');
const connection = require('./src/db/connection');
const userRoutes = require('./src/routes/user');
const productRoutes = require('./src/routes/product');
const languageRoutes = require('./src/routes/language');
const eventsRoutes = require('./src/routes/event');
const cors = require('cors');
const app = express();
const port = 3000;

// Configuración de i18n
i18n.configure({
    locales: ['en', 'es'], // lista de idiomas soportados
    directory: __dirname + '/locals/', // directorio donde se encuentran los archivos de traducción
    defaultLocale: 'es', // idioma por defecto
    objectNotation: true // permite usar notación de objeto para acceder a las traducciones
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
app.use('/events', eventsRoutes);

app.listen(process.env.PORT || port, () => {
    console.log(i18n.__('serverport') + ` ${port}`);
});

connection.connect(error => {
    if (error) throw error;
    console.log(i18n.__('connectionBD'));
});
