//db/connection.js
const mysql = require('mysql');


const connection = mysql.createConnection({
    // host: 'localhost',
    // port: 3306,
    // database: 'project_bar',
    // user: 'root',
    // password: ''
    host: 'sql5.freesqldatabase.com',
    database: 'sql5737565',
    user: 'sql5737565',
    password: 'VBKfITU5DN'
});


module.exports = connection;