
const connection = require('../db/connection');


//show all products
const getProducts = async (req, res ) =>{
   const query = 'call selectProduct';
    try{
        connection.query(query,(error, result)=>{
            if (error) {
                res.json({
                    error,
                    msg:"error to select"
                })
            } else {
                res.json({
                    result
                })
            }
        })
    }catch(error){
        res.error(error);
    }
}

//insert products
const insertProduct = async (req, res ) =>{
    const {name_product_p, price_p, Stock_p, id_status_p} = req.body;
    const query = 'CALL insertProduct(?,?,?,?)';
    try {
        connection.query(query, [name_product_p, price_p, Stock_p, id_status_p], (error, result)=>{
            if (error) {
                res.json({
                    error,
                    msg:"prodct exist"
                });
            } else {
                res.json({
                    result
                })
            }

        })
    } catch (error) {
     res.error(error)   
    }
}


//update product
const updateProduct = async (req, res) =>{
    const {id_p, name_product_p, price_p, Stock_p, id_status_p} = req.body;
    const query = 'CALL updateProduct(?,?,?,?,?)';

    try {
        connection.query(query, [id_p, name_product_p, price_p, Stock_p, id_status_p], (error, result)=>{
            if (error) {
                res.json({
                    error
                })
            } else {
                res.json({
                    result
                })
            }
        })
    } catch (error) {
        res.error(error);
    }
}



const deletepProduct = async (req, res) =>{
    //when need id ever use {} to collect info id_p
    const {id_p} = req.body; 
    const query = 'CALL deleteProduct(?)';
    try {
        connection.query(query, id_p, (error, result)=>{
            if (error) {
                res.json({
                    error,
                    msg:"delete product error", result
                })
            } else {
                res.json({
                    result,
                    msg: "deleted product"
                })
            }
        })
    } catch (error) {
        res.error(error)
    }
}

module.exports = { getProducts,insertProduct,updateProduct,deletepProduct}



