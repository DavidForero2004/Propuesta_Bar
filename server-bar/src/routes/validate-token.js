//routes/validate-token.js
const jwt = require('jsonwebtoken');
const i18n = require('i18n');

const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];

    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            const bearerToken = headerToken.slice(7);
            jwt.verify(bearerToken, process.env.SECRET_K || 'contrasena123');

            next();
        } catch (error) {
            res.status(401).json({
                msg: i18n.__('invalidToken')
            });
        }
    } else {
        res.status(401).json({
            msg: i18n.__('acessDeneged')
        });
    }
}

module.exports = { validateToken }
