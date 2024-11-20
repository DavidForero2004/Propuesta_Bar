//controllers/user.js
const bcrypt = require('bcryptjs'); // Cambiar a bcryptjs
const connection = require('../db/connection.js');
const jwt = require('jsonwebtoken');
const i18n = require('i18n');

// Show all users
const getUser = (req, res) => {
    const query = 'CALL selectUser';

    try {
        connection.query(query, (error, result) => {
            if (error) {
                res.status(500).json({
                    msg: 'Error',
                    error
                });
            } else {
                res.json({
                    result
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

// Insert user
const insertUser = async (req, res) => {
    const { name, email, password, id_status, id_rol } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const userExist = 'CALL selectUserEmail(?)';

    try {
        connection.query(userExist, email, (error, result) => {
            const userData = result[0]; // Access the first element of result
            const user = userData[0]; // The first element of userData contains the RowDataPacket object with the user data

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
                });
            }
        });
    } catch (error) {
        res.status(502).json({
            msg: 'Error',
            error
        });
    }
}

// Update user
const updateUser = async (req, res) => {
    const { id, name, email, password, id_status, id_rol } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const query = 'CALL updateUser(?,?,?,?,?,?)';

    try {
        connection.query(query, [id, name, email, hashPassword, id_status, id_rol], (error, result) => {
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
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Error',
            error
        });
    }
}

// Delete user
const deleteUser = (req, res) => {
    const { id } = req.params;
    const query = 'CALL deleteUser(?)';

    try {
        connection.query(query, id, (error, result) => {
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
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Error',
            error
        });
    }
}

// Login user
const loginUser = (req, res) => {
    const { email, password } = req.body;
    const userExist = 'CALL selectUserEmail(?)';

    try {
        connection.query(userExist, [email], async (error, result) => {
            const userData = result[0]; // Access the first element of result
            const user = userData[0]; // The first element of userData contains the RowDataPacket object with the user data

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
        });
    } catch (error) {
        res.status(502).json({
            msg: 'Error',
            error
        });
    }
}


const loginEmail = (req, res) => {
    const { email } = req.body;
    const query = 'CALL selectUserEmail(?)';

    try {
        connection.query(query, [email], (error, result) => {
            if (error) {
                return res.status(500).json({
                    msg: i18n.__('errorDatabaseServer'),
                    error
                });
            }

            const userData = result[0];
            const user = userData[0]; // Accede al primer usuario (si existe)

            if (!user) {
                return res.status(404).json({
                    msg: i18n.__('notExistUserEmail') + ` ${email}`
                });
            }

            // Genera un token si el email existe
            const token = jwt.sign(
                { email },
                process.env.SECRET_K || 'contrasena123', 
                { expiresIn: '1h' } // Token válido por 1 hora
            );

            res.json({ token });
        });
    } catch (error) {
        res.status(502).json({
            msg: 'Error',
            error
        });
    }
};

// Show user by id
const getUserId = (req, res) => {
    const { id } = req.params;
    const query = 'CALL selectUserId(?)';

    try {
        connection.query(query, id, (error, result) => {
            if (error) {
                res.status(400).json({
                    msg: 'Error',
                    error
                });
            } else {
                if (!result) {
                    res.status(400).json({
                        msg: i18n.__('notExistUser'),
                        result
                    });
                } else {
                    res.json({
                        result
                    });
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error',
            error
        });
    }
}

module.exports = { insertUser, loginUser, getUser, deleteUser, updateUser, getUserId, loginEmail };
