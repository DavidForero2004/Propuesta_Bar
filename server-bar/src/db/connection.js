//db/connection.js
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'project_bar',
    user: 'root',
    password: ''
});


module.exports = connection;