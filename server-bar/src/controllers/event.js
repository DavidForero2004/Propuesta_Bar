const connection = require('../db/connection');



//Get event
const getEventActive = async(req,res)=>{
    const query = 'call selectEventActive';
    try {
        connection.query(query, (error, result) =>{
            if(error){
                res.status(500).json({
                    msg: "Error",
                    error
                })
            }else{
                res.json({
                    msg: "all ok",
                    result
                })
            }
        })
    } catch (error) {
             res.status(400).json({
                msg: 'error not found',
                error
             })
         }
};





//insert a new event
const insertEvent = async (req, res) => {
    const { name_event, date} = req.body;
    const query = 'CALL insertEvent (?,?)';
    
    try {
        connection.query(query, [name_event, date], (error, result) => {
            if (error) {
                res.status(500).json({
                    msg: 'Error inserting event',
                    error
                });
            } else {
                res.json({
                    msg: 'New event inserted',
                    result
                });
            }
        });
    } catch (error) {
        res.status(400).json({
            msg: 'error not found',
            error
        });
    }
};




module.exports = {insertEvent, getEventActive};