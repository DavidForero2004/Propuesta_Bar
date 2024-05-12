//controller/file.js
const path = require('path');
const fs = require('fs');

const viewFile = async (req, res) => {
    const file = req.params.image;
    const pathImage = path.join(__dirname, '../assets/img/', file);
    if (await fs.existsSync(pathImage)) {
        res.sendFile(pathImage);
    } else {
        const pathImageNotFound = path.join(__dirname, '../assets/img/Imagenotfound.png');
        res.sendFile(pathImageNotFound);
    }
}

const saveFile = (req, res) => {
    res.send({data: 'Imagen cargada'});
};

module.exports = { saveFile, viewFile };
