//controllers/event.js
const connection = require('../db/connection');
const i18n = require('i18n');


//Get event
const getEventActive = async (req, res) => {
    const query = 'CALL selectEventActive';

    //////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, (error, result) => {
            try {
                if (error) {
                    res.status(500).json({
                        msg: "Error",
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


//insert a new event
const insertEvent = async (req, res) => {
    const { name_event, date } = req.body;
    const query = 'CALL insertEvent (?,?)';

    //////////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, [name_event, date], (error, result) => {
            try {
                if (error) {
                    res.status(500).json({
                        msg: i18n.__('errorInsert'),
                        error
                    });
                } else {
                    res.json({
                        msg: i18n.__('newEvent'),
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


//update event
const updateEvent = async (req, res) => {
    const {id, name_event, date } = req.body;
    const query = 'CALL updateEvent(?,?,?)';

    ///////////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, [id, name_event, date], (error, result) => {
            try {
                if (error) {
                    res.status(500).json({
                        msg: i18n.__('errorUpdate'),
                        error
                    });
                } else {
                    res.json({
                        msg: i18n.__('updateEvent'),
                        result
                    });
                }
            } catch (error) {
                res.status(400).json({
                    msg: 'Error',
                    error
                });
            }
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Error',
            error
        });
    }
}


//delete event
const deleteEvent = async (req, res) => {
    const { id } = req.params;
    const query = 'CALL deleteEvent(?)';

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
                        msg: i18n.__('deleteEvent'),
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


//show event id
const getEventId = async (req, res) => {
    const { id } = req.params;
    const query = 'CALL selectEventId(?)';

    ////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, id, async (error, result) => {
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


module.exports = { insertEvent, getEventActive, updateEvent, deleteEvent, getEventId };
