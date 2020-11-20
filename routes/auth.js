const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario_model')
const config = require('config')

const ruta = express.Router()

ruta.post('/', (req,res) => {
    Usuario.findOne({email: req.body.email})
        .then(user => {
            if(user){
                const passwordValidar = bcrypt.compareSync(req.body.password, user.password)
                
                if(passwordValidar){
                    const jwToken = jwt.sign({_id: user._id, nombre: user.nombre, email: user.email}, config.get('configTOKEN.SEED'), {expiresIn: config.get('configTOKEN.expiration')})
                   res.status(200).send({
                       usuario: {
                           _id: user._id,
                           nombre: user.nombre,
                           email: user.email
                       }, jwToken
                   })
                    /* res.status(200).json({
                        email: user.email
                    })*/
                } else{
                    res.status(400).json({
                        error: 'Usuario o contraseña incorrectos'
                    })
                }
            }else{
                res.status(400).json({
                    error: 'Usuario o contraseña incorrectos'
                })
            }
        })
        .catch(err=>{
            res.status(400).json({
                error: 'Error en el servicio' +err
            })
        })
})


module.exports = ruta