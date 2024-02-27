//controllers/status.js
const connection = require('../db/connection');
const i18n = require('i18n');


//show all status
const getStatus = (req, res) => {
    const query = 'CALL selectStatus';

    //////////////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, (error, result) => {
            const statusData = result[0]; // access the first element of result
            const status = statusData[0]; // the first element of userData contains the RowDataPacket object with the user data

            ////////////////////////////////////////////////////////////

            try {
                if (error) {
                    res.status(500).json({
                        msg: 'Error',
                        error
                    });
                } else {
                    res.json({
                        status
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


//insert status
const insertStatus = (req, res) => {
    const { name } = req.body;
    const query = 'CALL insertStatus(?)';

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
                        msg: i18n.__('newStatus'),
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


//update status
const updateStatus = (req, res) => {
    const { id, name } = req.body;
    const query = 'CALL updateStatus(?,?)';

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
                        msg: i18n.__('updateStatus'),
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


//delete status
const deleteStatus = (req, res) => {
    const { id } = req.parameters;
    const query = 'CALL deleteStatus(?)';

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
                        msg: i18n.__('deleteStatus'),
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


//show status id
const getStatusId = (req, res) => {
    const { id } = req.params;

    ////////////////////////////////////////////////////////////////////

    try {
        const query = 'CALL selectStatusId(?)'

        connection.query(query, id, (error, result) => {
            const statusData = result[0]; // access the first element of result
            const status = statusData[0]; // the first element of userData contains the RowDataPacket object with the user data

            try {
                if (error) {
                    res.status(400).json({
                        msg: 'Error',
                        error
                    });
                } else {
                    if (!user) {
                        res.status(400).json({
                            msg: i18n.__('notExistStatus'),
                            result
                        });
                    } else {
                        res.json({
                            status
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


module.exports = { getStatus, insertStatus, updateStatus, deleteStatus, getStatusId };


