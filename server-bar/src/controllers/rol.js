//controllers/rol.js
const connection = require('../db/connection');
const i18n = require('i18n');


//show all rol
const getRol = (req, res) => {
    const query = 'CALL selectRol';

    //////////////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, (error, result) => {
            try {
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


//insert rol
const insertRol = (req, res) => {
    const { name } = req.body;
    const query = 'CALL insertRol(?)';

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, name, (error, result) => {
            try {
                if (error) {
                    res.status(500).json({
                        msg: i18n.__('errorInsert'),
                        error
                    });
                } else {
                    res.json({
                        msg: i18n.__('newRol'),
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


//update rol
const updateRol = (req, res) => {
    const { id, name } = req.body;
    const query = 'CALL updateRol(?,?)';

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, [id, name], (error, result) => {
            try {
                if (error) {
                    res.status(500).json({
                        msg: i18n.__('errorUpdate'),
                        error
                    });
                } else {
                    res.json({
                        msg: i18n.__('updateRol'),
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


//delete rol
const deleteRol = (req, res) => {
    const { id } = req.params;
    const query = 'CALL deleteRol(?)';

    ///////////////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, id, (error, result) => {
            try {
                if (error) {
                    res.json({
                        msg: i18n.__('errorDelete'),
                        error
                    });
                } else {
                    res.json({
                        msg: i18n.__('deleteRol'),
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


//show rol id
const getRolId = (req, res) => {
    const { id } = req.params;

    ////////////////////////////////////////////////////////////////////

    try {
        const query = 'CALL selectRolId( ? )'

        connection.query(query, id, (error, result) => {
            try {
                if (error) {
                    res.status(400).json({
                        msg: 'Error',
                        error
                    });
                } else {
                    if (!result) {
                        res.status(400).json({
                            msg: i18n.__('notExistRol'),
                            result
                        });
                    } else {
                        res.json({
                            result
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


module.exports = { getRol, insertRol, updateRol, deleteRol, getRolId };



