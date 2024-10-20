//db/connection.js
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'mysql-hollowbar.alwaysdata.net',
    port: 3306,
    database: 'hollowbar_test',
    user: 'hollowbar_david',
    password: 'David.forero2019'
});


module.exports = connection;