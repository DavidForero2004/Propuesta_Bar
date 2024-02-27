//controllers/products.js
const connection = require('../db/connection');
const i18n = require('i18n');

//show all products
const getProducts = async (req, res) => {
    const query = 'CALL selectProduct';

    //////////////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, async (error, result) => {
            const productData = result[0]; // access the first element of result
            const product = productData[0]; // the first element of userData contains the RowDataPacket object with the user data

            ////////////////////////////////////////////////////////////

            try {
                if (error) {
                    res.status(500).json({
                        msg: 'Error',
                        error
                    });
                } else {
                    res.json({
                        product
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
const insertProduct = async (req, res) => {
    const { name_product, price, stock, id_status } = req.body;
    const query = 'CALL insertProduct(?,?,?,?)';

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, [name_product, price, stock, id_status], (error, result) => {
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


//update product
const updateProduct = async (req, res) => {
    const { id, name_product, price, stock, id_status } = req.body;
    const query = 'CALL updateProduct(?,?,?,?,?)';

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, [id, name_product, price, stock, id_status], async (error, result) => {
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


//delete product
const deletepProduct = async (req, res) => {
    const { id } = req.parameters;
    const query = 'CALL deleteProduct(?)';

    ///////////////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, id, async (error, result) => {
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
const getProductId = async (req, res) => {
    const { id } = req.params;

    ////////////////////////////////////////////////////////////////////

    try {
        const query = 'CALL selectProductId(?)'

        connection.query(query, id, async (error, result) => {
            const productData = result[0]; // access the first element of result
            const product = productData[0]; // the first element of userData contains the RowDataPacket object with the user data

            try {
                if (error) {
                    res.status(400).json({
                        msg: 'Error',
                        error
                    });
                } else {
                    if (!user) {
                        res.status(400).json({
                            msg: i18n.__('notExistProduct'),
                            result
                        });
                    } else {
                        res.json({
                            product
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


module.exports = { getProducts, insertProduct, updateProduct, deletepProduct };



