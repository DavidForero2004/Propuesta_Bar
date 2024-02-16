const mysql = require('mysql')


const connection = mysql.createConnection({
    host: 'localhost',
    database: 'project_bar',
    user: 'root',
    password: ''
})



module.exports = connection;