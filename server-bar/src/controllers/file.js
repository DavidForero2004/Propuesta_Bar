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
    // res.send({data: 'Imagen cargada'});
};

const deleteFile = async (req, res) => {
    const file = req.params.image;
    const pathImage = path.join(__dirname, '../assets/img/', file);
    if (await fs.existsSync(pathImage)) {
        fs.unlink(pathImage, (err) => {
            if (err) {
                // console.error('Error al eliminar el archivo:', err);
            } else {
                // console.log('Archivo eliminado con éxito');
            }
        });
    }
};

module.exports = { saveFile, viewFile, deleteFile };
