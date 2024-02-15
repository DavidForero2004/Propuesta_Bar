// user.js
const bcrypt = require('bcrypt');
const connection = require('../db/connection.js');

const getUser = (_req, res ) =>{
    res.json({
        msg:"Get users"
    })
}

//Create User
const newUser = async (req, res) => {
    const { name, email, password, id_status, id_rol } = req.body
    const hashPassword = await bcrypt.hash(password, 10)

    /////////////////////////////////////////////////////////////////////////////////////

    const userExist = `SELECT COUNT(*) FROM user WHERE email = ${email}`

    if (userExist > 0) {
        res.status(400).json({
            msg: `There is already a user with this email ${email}`
        })
    } else {
        const query = `INSERT INTO user(name, email, password, id_status, id_rol) VALUES("${name}", "${email}", "${hashPassword}", ${id_status}, ${id_rol})`

        connection.query(query ,(error, result) => {
            if (error) {
                res.json({
                    msg: 'Error to insert',
                    error
                })
            } else {
                res.json({
                    msg: 'New User',
                    result
                })
            }
        })
    }
};

//Login User
const loginUser = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'Login User',
        body
    });
};

module.exports = { newUser, loginUser, getUser };
