//controllers/order.js
const connection = require('../db/connection');
const i18n = require('i18n');


//show all order
const getOrder = (req, res) => {
    const query = 'CALL selectOrder';

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


//insert order
const insertOrder = (req, res) => {
    const { type_document, num_document, id_table, id_status } = req.body;
    const query = 'CALL insertOrder(?,?,?,?)';
    const queryNumDocument = 'CALL selectOrderNumDocument(?)';

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    try {
        connection.query(queryNumDocument, [num_document], (error, resultData) => {
            try {
                if (error) {
                    res.status(500).json({
                        msg: 'Error',
                        error
                    });
                } else {
                    const count = resultData[0].length;
                    if (count > 0) {
                        res.json({
                            msg: i18n.__('existOrderActive'),
                        });
                    } else if(count == 0) {
                        connection.query(query, [type_document, num_document, id_table, id_status], (error, result) => {
                            try {
                                if (error) {
                                    res.status(500).json({
                                        msg: i18n.__('errorInsert'),
                                        error
                                    });
                                } else {
                                    res.json({
                                        msg: i18n.__('newOrder'),
                                        result
                                    });
                                }
                            } catch (error) {
                                res.status(400).json({
                                    msg: 'Error 2',
                                    error
                                });
                            }
                        });
                    }
                }
            } catch (error) {
                res.status(500).json({
                    msg: 'Error 3',
                    error
                });
            }
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Error 4',
            error
        });
    }
}


//update order
const updateOrder = (req, res) => {
    const { id, id_status } = req.body;
    const query = 'CALL updateOrder(?,?)';

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, [id, id_status], (error, result) => {
            try {
                if (error) {
                    res.status(500).json({
                        msg: i18n.__('errorUpdate'),
                        error
                    });
                } else {
                    res.json({
                        msg: i18n.__('updateOrder'),
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


//delete order
const deleteOrder = (req, res) => {
    const { id } = req.params;
    const query = 'CALL deleteOrder(?)';

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
                        msg: i18n.__('deleteOrder'),
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


//show order id
const getOrderId = (req, res) => {
    const { id } = req.params;

    ////////////////////////////////////////////////////////////////////

    try {
        const query = 'CALL selectOrderId(?)'

        connection.query(query, id, (error, result) => {
            try {
                if (error) {
                    res.status(400).json({
                        msg: 'Error',
                        error
                    });
                } else {
                    if (!user) {
                        res.status(400).json({
                            msg: i18n.__('notExistOrder'),
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


module.exports = { getOrder, insertOrder, updateOrder, deleteOrder, getOrderId };