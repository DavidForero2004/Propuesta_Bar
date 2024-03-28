//controllers/order-products.js
const connection = require('../db/connection');
const i18n = require('i18n');


//show all order product
const getOrderProduct = (req, res) => {
    const query = 'CALL selectOrderProducts';

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


//insert order product
const insertOrderProduct = (req, res) => {
    const { id_order, id_product, count, id_status } = req.body;
    const query = 'CALL insertOrderProduct(?,?,?,?,?)';
    const queryProduct = 'CALL selectProductId(?)';

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    try {
        connection.query(queryProduct, id_product, (error, result) => {
            try {
                if (error) {
                    res.status(500).json({
                        msg: i18n.__('notExistProduct'),
                        error
                    });
                } else {
                    const productData = result[0]; 
                    const product = productData[0];
                    const productPrice = parseInt(product.price);
                    const total = productPrice * count;

                    connection.query(query, [id_order, id_product, count, total, id_status], (error, resultOrderProduct) => {
                        try {
                            if (error) {
                                res.status(500).json({
                                    msg: i18n.__('errorInsert'),
                                    error
                                });
                            } else {
                                res.json({
                                    msg: i18n.__('newOrderProduct'),
                                    resultOrderProduct
                                });
                            }
                        } catch (error) {
                            res.status(400).json({
                                msg: 'Error',
                                error
                            });
                        }
                    });
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


//update order product
const updateOrderProduct = (req, res) => {
    const { id, id_order, id_product, count, id_status } = req.body;
    const query = 'CALL updateOrderProduct(?,?,?,?,?,?)';
    const queryProduct = 'CALL selectProductId(?)';

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    try {
        connection.query(queryProduct, id_product, (error, result) => {
            try {
                if (error) {
                    res.status(500).json({
                        msg: i18n.__('notExistProduct'),
                        error
                    });   
                } else {
                    const productData = result[0]; 
                    const product = productData[0];
                    const productPrice = parseInt(product.price);
                    const total = productPrice * count;

                    connection.query(query, [id, id_order, id_product, count, total, id_status], (error, resultOrderProduct) => {
                        try {
                            if (error) {
                                res.status(500).json({
                                    msg: i18n.__('errorUpdate'),
                                    error
                                });
                            } else {
                                res.json({
                                    msg: i18n.__('updateOrderProduct'),
                                    resultOrderProduct
                                });
                            }
                        } catch (error) {
                            res.status(400).json({
                                msg: 'Error',
                                error
                            });
                        }
                    });
                }
            } catch (error) {
                
            }
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Error',
            error
        });
    }
}


//delete order product
const deleteOrderProduct = (req, res) => {
    const { id } = req.params;
    const query = 'CALL deleteOrderProduct(?)';

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
                        msg: i18n.__('deleteOrderProduct'),
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


//show order product id
const getOrderProductId = (req, res) => {
    const { id } = req.params;

    ////////////////////////////////////////////////////////////////////

    try {
        const query = 'CALL selectOrderProductId(?)'

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
                            msg: i18n.__('notExistOrderProduct'),
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


module.exports = { getOrderProduct, insertOrderProduct, updateOrderProduct, deleteOrderProduct, getOrderProductId };