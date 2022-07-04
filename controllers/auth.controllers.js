const {response} = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario.model');

const login = async (req, res=response) =>{
    
    const { email, password } = req.body;


    try {

        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                msg:'Email no valido'
            });
        }
        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password)
        if(!validPassword){
            return res.status(400).json({
                msg:'Contraseña no válida'
            })
        }

        //Generar el Token - JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'fallo el login'
        })
        
    }

}

module.exports={
    login
}