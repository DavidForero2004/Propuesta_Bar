//controllers/table.js
const connection = require('../db/connection');
const i18n = require('i18n');


//show all tables
const getTable = (req, res) => {
    const query = 'CALL selectTable';

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


//insert table
const insertTable = (req, res) => {
    const { name_table, id_status } = req.body;
    const query = 'CALL insertTable(?,?)';

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, [name_table, id_status], (error, result) => {
            try {
                if (error) {
                    res.status(500).json({
                        msg: i18n.__('errorInsert'),
                        error
                    });
                } else {
                    res.json({
                        msg: i18n.__('newTable'),
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


//update table
const updateTable = (req, res) => {
    const { id, name_table, id_status } = req.body;
    const query = 'CALL updateTable(?,?,?)';

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, [id, name_table, id_status], (error, result) => {
            try {
                if (error) {
                    res.status(500).json({
                        msg: i18n.__('errorUpdate'),
                        error
                    });
                } else {
                    res.json({
                        msg: i18n.__('updateTable'),
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


//delete table
const deleteTable = (req, res) => {
    const { id } = req.params;
    const query = 'CALL deleteTable(?)';

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
                        msg: i18n.__('deleteTable'),
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


//show table id
const getTableId = (req, res) => {
    const { id } = req.params;
    const query = 'CALL selectTableId(?)';

    ////////////////////////////////////////////////////////////////////

    try {
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
                            msg: i18n.__('notExistProduct'),
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


module.exports = { getTable, insertTable, updateTable, deleteTable, getTableId };



