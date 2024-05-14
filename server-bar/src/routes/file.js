const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { saveFile, viewFile, deleteFile } = require('../controllers/file');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destination = path.resolve(__dirname, '../assets/img/');
        // console.log(destination);
        cb(null, destination);
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split(".").pop();
        const name = file.originalname.split('.').slice(0, -1).join('.');

        cb(null, `${name}.${extension}`);
    }
})

const upload = multer({ storage });

router.get('/:image', viewFile)
router.post('/save', upload.single('file'), saveFile);
router.delete('/delete/:image', deleteFile);


module.exports = router;
