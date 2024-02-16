const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization']

    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            const bearerToken = headerToken.slice(7)
            jwt.verify(bearerToken, process.env.SECRET_K || 'contrasena123')

            next()
        } catch (error) {
            res.status(401).json({
                msg: 'Token no valido'
            })
        }
    } else {
        res.status(401).json({
            msg: 'Acceso denegado'
        })
    }

}

module.exports = { validateToken }
