//controllers/event.js
const connection = require('../db/connection')


//Get event
const getEventActive = async (req, res) => {
    const query = 'CALL selectEventActive'

    //////////////////////////////////////////////////////////////////////

    try {
        connection.query(query, (error, result) => {
            if(error){
                res.status(500).json({
                    msg: "Error",
                    error
                })
            }else{
                res.json({
                    msg: "All ok",
                    result
                })
            }
        })
    } catch(error) {
        res.status(400).json({
            msg: 'Error not found',
            error
        })
    }
}


//insert a new event
const insertEvent = async (req, res) => {
    const { name_event, date} = req.body
    const query = 'CALL insertEvent (?,?)'

    //////////////////////////////////////////////////////////////////////////
    
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
        })
    } catch(error) {
        res.status(400).json({
            msg: 'Error not found',
            error
        })
    }
}


//update event
const updateEvent = async (req, res) => {
    const{name_event_p, date_p, id_p } = req.body
    const query = 'CALL updateEvent(?,?,?)'

    ///////////////////////////////////////////////////////////////////////////

    try {
        connection.query(query,[id_p,name_event_p, date_p],(error, result) => {
            if (error) {
                res.status(500).json({
                    msg:"Error to update",
                    error
                })
            } else {
                res.json({
                    msg:"Event updated",
                    result
                })
            }
        })
    } catch(error) {
        res.status(400).json({
            msg: 'Error not found',
            error
        })
    }
}


//delete event
const deleteEvent = async (req, res) => {
    const {id_p}= req.body
    const  query = 'CALL daleteEvent(?)'

    ///////////////////////////////////////////////////////////

    try {
        connection.query(query, id_p, (error, result) => {
            if (error) {
                res.status(500).json({
                    msg: "Error to delete",
                    error
                })
            } else {
                res.json({
                    msg:"Deleted",
                    result
                })
            }
        })
    } catch(error) {
        res.status(400).json({
            msg: 'Error not found',
            error
        })
    }
}


module.exports = { insertEvent, getEventActive, updateEvent,deleteEvent }
