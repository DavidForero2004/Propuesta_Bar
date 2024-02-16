// user.js
const bcrypt = require('bcrypt')
const connection = require('../db/connection.js')
const jwt = require('jsonwebtoken')

//List User
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

    try {
        const userExist = `SELECT * FROM user WHERE email = '${email}'`

        connection.query(userExist, (error, result) => {
            if (error) {
                res.status(500).json({
                    msg: 'Database server error',
                    error
                })
            } else {
                if (result.length > 0) {
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
            }
        })
    } catch (error) {
        res.status(502).json({
            msg: 'Error',
            error
        })
    }
};

//Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    /////////////////////////////////////////////////////////////////////////////////////

    try {
        const userExist = `SELECT * FROM user WHERE email = '${email}'`

        connection.query(userExist, async (error, result) => {
            const user = result[0];
            const passwordvalidate = await bcrypt.compare(password, user.password)
            const token = jwt.sign({
                username: email
            }, process.env.SECRET_K || 'contrasena123', {
                expiresIn: '10000'
            })

            /////////////////////////////////////////////////////////////////////////////////////
            if (error) {
                res.status(500).json({
                    msg: 'Database server error',
                    error
                })
            } else {
                if (!result.length) {
                    res.status(400).json({
                        msg: `There is no user with this email ${email}`
                    })
                }

                if (!passwordvalidate) {
                    res.status(400).json({
                        msg: 'Incorrect password'
                    })
                }

                res.json({
                    token
                })
                
            }
        })
    } catch (error) {
        res.status(502).json({
            msg: 'Error',
            error
        })
    }
};

module.exports = { newUser, loginUser, getUser };
