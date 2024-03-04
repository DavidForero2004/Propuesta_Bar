//routes/table.js
const express = require('express');
const router = express.Router();


const { getTable, getTableId, insertTable, updateTable, deleteTable } = require('../controllers/table.js');
const { validateToken } = require('../routes/validate-token.js');


//routes call all methods
router.get('/', validateToken, getTable);
router.get('/:id', validateToken, getTableId);
router.post('/inserttable', validateToken, insertTable);
router.put('/updatetable', validateToken, updateTable);
router.delete('/deletetable/:id', validateToken, deleteTable);


module.exports = router;