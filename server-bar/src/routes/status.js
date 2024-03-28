//routes/status.js
//routes/table.js
const express = require('express');
const router = express.Router();


const { getStatus, getStatusId, insertStatus, updateStatus, deleteStatus } = require('../controllers/status.js');
const { validateToken } = require('../routes/validate-token.js');


//routes call all methods
router.get('/', validateToken, getStatus);
router.get('/:id', validateToken, getStatusId);
router.post('/insertstatus', validateToken, insertStatus);
router.put('/updatestatus', validateToken, updateStatus);
router.delete('/deletestatus/:id', validateToken, deleteStatus);


module.exports = router;