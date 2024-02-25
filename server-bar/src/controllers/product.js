//controllers/products.js
const connection = require('../db/connection');


//show all products
const getProducts = async (req, res) => {
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
const insertProduct = async (req, res) => {
    const { name_product_p, price_p, Stock_p, id_status_p } = req.body;
    const query = 'CALL insertProduct(?,?,?,?)';

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, [name_product_p, price_p, Stock_p, id_status_p], (error, result) => {
            try {
                if (error) {
                    res.status(500).json({
                        msg: i18n.__('errorInsert'),
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


//update product
const updateProduct = async (req, res) => {
    const { id_p, name_product_p, price_p, Stock_p, id_status_p } = req.body;
    const query = 'CALL updateProduct(?,?,?,?,?)';

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, [id_p, name_product_p, price_p, Stock_p, id_status_p], (error, result) => {
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
    //when need id ever use {} to collect info id_p
    const { id_p } = req.body;
    const query = 'CALL deleteProduct(?)';

    ///////////////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, id_p, (error, result) => {
            if (error) {
                res.json({
                    msg: "Delete product error", result,
                    error
                });
            } else {
                res.json({
                    result,
                    msg: "Deleted product"
                });
            }
        });
    } catch (error) {
        res.error(error);
    }
}


module.exports = { getProducts, insertProduct, updateProduct, deletepProduct };



