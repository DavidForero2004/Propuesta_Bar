const express = require('express')
const mysql = require('mysql')
const body_parser = require('body-parser')

const app = express()

const port = 3000

const conection = mysql.createConnection({
    host: 'localhost',
    database: 'project_bar',
    user: 'root',
    password: ''
})

//header configuration, api permissions
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    next()
})

app.use(body_parser.json())

app.listen(port, () => {
    console.log(`Servidor arriba en el puerto: ${port}`)
})

conection.connect(error => {
    if(error) throw error
    console.log('Conexion exitosa a la bd')
})

app.get('/', (req, res) => {
    res.send('API')
})
