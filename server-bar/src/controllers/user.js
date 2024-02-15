// user.js
const bcrypt = require('bcrypt');
const connection = require('../db/connection.js');

const getUser = (req, res ) =>{
    res.json({
        msg:"Get users"
    })
}

const newUser = async (req, res) => {
    const { name, email, password, status, id_rol } = req.body
    const hashPassword = await bcrypt.hash(password, 10)

    // console.log(name)
    // console.log(email)
    // console.log(hashPassword)
    // console.log(status)
    // console.log(id_rol) 

    const query = `INSERT INTO user(name, email, password, status, id_rol) VALUES("${name}", "${email}", "${hashPassword}", "${status}", ${id_rol})`

    try {
        connection.query(query, (errorq) => {
            if(!error) 
                res.json({
                    msg: 'New User',
                })
        })
    } catch (error) {
        res.status(400).json({
            msg: 'An error was found',
            error
        })
    }
};

const loginUser = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'Login User',
        body
    });
};

module.exports = { newUser, loginUser, getUser };
