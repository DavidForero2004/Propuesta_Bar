//controllers/products.js
const connection = require('../db/connection');
const i18n = require('i18n');


//show all products
const getProduct = (req, res) => {
    const query = 'CALL selectProduct';

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


//insert products
const insertProduct = (req, res) => {
    const { name_product, image, price, stock, id_status } = req.body;
    const query = 'CALL insertProduct(?,?,?,?,?)';

    const imageExtension = /\.(jpg|jpeg|png|webp)$/i;

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    if (!imageExtension.test(image)) {
        return res.status(400).json({
            msg: i18n.__('imageExtension'),
        });
    } else {
        try {
            connection.query(query, [name_product, image, price, stock, id_status], (error, result) => {
                try {
                    if (error) {
                        res.status(500).json({
                            msg: i18n.__('errorInsert'),
                            error
                        });
                    } else {
                        res.json({
                            msg: i18n.__('newProduct'),
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
}


//update product
const updateProduct = (req, res) => {
    const { id, name_product, image, price, stock, id_status } = req.body;
    const query = 'CALL updateProduct(?,?,?,?,?,?)';

    const imageExtension = /\.(jpg|jpeg|png|webp)$/i;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (!imageExtension.test(image)) {
        return res.status(400).json({
            msg: i18n.__('imageExtension'),
        });
    } else {
        try {
            connection.query(query, [id, name_product, image, price, stock, id_status], (error, result) => {
                try {
                    if (error) {
                        res.status(500).json({
                            msg: i18n.__('errorUpdate'),
                            error
                        });
                    } else {
                        res.json({
                            msg: i18n.__('updateProduct'),
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
}


//delete product
const deleteProduct = (req, res) => {
    const { id } = req.params;
    const query = 'CALL deleteProduct(?)';

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
                        msg: i18n.__('deleteProduct'),
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


//show product id
const getProductId = (req, res) => {

    const { id } = req.params;

    ////////////////////////////////////////////////////////////////////

    try {
        const query = 'CALL selectProductId( ? )'

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


module.exports = { getProduct, insertProduct, updateProduct, deleteProduct, getProductId };



