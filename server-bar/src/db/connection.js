//db/connection.js
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'sql5.freesqldatabase.com',
    port: 3306,
    database: 'sql5737565',
    user: 'sql5737565',
    password: 'VBKfITU5DN'
});


module.exports = connection;