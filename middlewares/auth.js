const jwt = require('jsonwebtoken')
const config = require('config')


//se cre la funcion donde tenemos como parametros req, rest y next
let verificarToken = (req, res, next) => {
    //obtenemos el token de la solicitud
    let token = req.get('Authorization')

    //verificamos el token pasando como parametro el token, semilla y callback
    jwt.verify(token, config.get('configTOKEN.SEED'),(err,decoded) =>{
        //si hay error entramos en la condicion
        if(err){
            return res.status(401).json({
                error: err
            })
        }
        //en caso de que no haya error enviamos el token
        res.usuario = decoded.usuario
        next()
    })
}


module.exports = verificarToken