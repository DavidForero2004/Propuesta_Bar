//routes/rol.js
const express = require('express');
const router = express.Router();


const { getRol, insertRol, getRolId, updateRol, deleteRol } = require('../controllers/rol.js');
const { validateToken } = require('../routes/validate-token.js');


//routes call all methods
router.get('/', validateToken, getRol);
router.get('/:id', validateToken, getRolId);
router.post('/insertrol', validateToken, insertRol);
router.put('/updaterol', validateToken, updateRol);
router.delete('/deleterol/:id', validateToken, deleteRol);


module.exports = router;