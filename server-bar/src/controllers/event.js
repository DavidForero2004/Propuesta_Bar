const connection = require('../db/connection');



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




module.exports = {insertEvent};
