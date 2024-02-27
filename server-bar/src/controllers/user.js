//controllers/user.js
const bcrypt = require('bcrypt');
const connection = require('../db/connection.js');
const jwt = require('jsonwebtoken');
const i18n = require('i18n');


//show all user
const getUser = (req, res) => {
    const query = 'CALL selectUser';

    //////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, (error, result) => {
            const userData = result[0]; // access the first element of result
            const user = userData[0]; // the first element of userData contains the RowDataPacket object with the user data

            ////////////////////////////////////////////////////////////////////

            try {
                if (error) {
                    res.status(500).json({
                        msg: 'Error',
                        error
                    });
                } else {
                    res.json({
                        user
                    });
                }
            } catch (error) {
                res.status(400).json({
                    msg: 'Error',
                    error
                });
            }
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Error',
            error
        });
    }
}


//insert user
const insertUser = async (req, res) => {
    const { name, email, password, id_status, id_rol } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const userExist = 'CALL selectUserEmail(?)';

    /////////////////////////////////////////////////////////////////////////////////////

    connection.query(userExist, email, (error, result) => {
        try {
            const userData = result[0]; // access the first element of result
            const user = userData[0]; // the first element of userData contains the RowDataPacket object with the user data

            if (error) {
                res.status(500).json({
                    msg: i18n.__('errorDatabaseServer'),
                    error
                });
            } else {
                if (user) {
                    res.status(400).json({
                        msg: i18n.__('existUserEmail') + ` ${email}`
                    });
                    return;
                }

                const query = 'CALL insertUser(?,?,?,?,?)';

                connection.query(query, [name, email, hashPassword, id_status, id_rol], (error, result) => {
                    try {
                        if (error) {
                            res.json({
                                msg: i18n.__('errorInsert'),
                                error
                            });
                            return
                        } else {
                            res.json({
                                msg: i18n.__('newUser'),
                                result
                            });
                        }
                    } catch (error) {
                        res.status(502).json({
                            msg: 'Error',
                            error
                        });
                    }
                });
            }
        } catch (error) {
            res.status(502).json({
                msg: 'Error',
                error
            });
        }
    });
}


//update user
const updateUser = async (req, res) => {
    const { id, name, email, password, id_status, id_rol } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const query = 'CALL updateUser(?,?,?,?,?,?)';

    ///////////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, [id, name, email, hashPassword, id_status, id_rol], (error, result) => {
            try {
                if (error) {
                    res.status(500).json({
                        msg: i18n.__('errorUpdate'),
                        error
                    });
                } else {
                    res.json({
                        msg: i18n.__('updateUser'),
                        result
                    });
                }
            } catch (error) {
                res.status(400).json({
                    msg: 'Error',
                    error
                });
            }
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Error',
            error
        });
    }
}


//delete user
const deleteUser = (req, res) => {
    const { id } = req.params;
    const query = 'CALL deleteUser(?)';

    ///////////////////////////////////////////////////////////

    try {
        connection.query(query, id, (error, result) => {
            try {
                if (error) {
                    res.status(500).json({
                        msg: i18n.__('errorDelete'),
                        error
                    });
                } else {
                    res.json({
                        msg: i18n.__('deleteUser'),
                        result
                    });
                }
            } catch (error) {
                res.status(400).json({
                    msg: 'Error',
                    error
                });
            }
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Error',
            error
        });
    }
}


//login user
const loginUser = (req, res) => {
    const { email, password } = req.body;
    const userExist = 'CALL selectUserEmail(?)';

    /////////////////////////////////////////////////////////////////////////////////////

    connection.query(userExist, [email], async (error, result) => {
        try {
            const userData = result[0]; // access the first element of result
            const user = userData[0]; // the first element of userData contains the RowDataPacket object with the user data

            if (error) {
                res.status(500).json({
                    msg: i18n.__('errorDatabaseServer'),
                    error
                });
            } else {
                if (!user) {
                    res.status(400).json({
                        msg: i18n.__('notExistUserEmail') + ` ${email}`
                    });
                    return;
                }

                const passwordvalidate = await bcrypt.compare(password, user.password);

                if (!passwordvalidate) {
                    res.status(400).json({
                        msg: i18n.__('incorrectPassword')
                    });
                    return;
                }

                const token = jwt.sign({
                    username: email
                }, process.env.SECRET_K || 'contrasena123');

                res.json({
                    token
                });
            }
        } catch (error) {
            res.status(502).json({
                msg: 'Error',
                error
            });
        }
    });
}


//show user id
const getUserId = (req, res) => {
    const { id } = req.params;

    ////////////////////////////////////////////////////////////////////

    try {
        const query = 'CALL selectUserId(?)'

        connection.query(query, id, (error, result) => {
            const userData = result[0]; // access the first element of result
            const user = userData[0]; // the first element of userData contains the RowDataPacket object with the user data

            try {
                if (error) {
                    res.status(400).json({
                        msg: 'Error',
                        error
                    });
                } else {
                    if (!user) {
                        res.status(400).json({
                            msg: i18n.__('notExistUser'),
                            result
                        });
                    } else {
                        res.json({
                            user
                        });
                    }
                }
            } catch (error) {
                res.status(500).json({
                    msg: 'Error',
                    error
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error',
            error
        });
    }
}


module.exports = { insertUser, loginUser, getUser, deleteUser, updateUser, getUserId };
