const { response } = require('express')
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');



const getUsuarios = async (req, res)=>{
    const user = await Usuario.find({}, 'nombre email role google')

    res.json({
        ok:true,
        user,
        uid:req.uid
    })

}
const crearUsuarios = async (req, res=response)=>{
    const {email, password} = req.body;

    

    try {

        const emaNoDuplicate= await Usuario.findOne({email});

            if(emaNoDuplicate){
                return res.status(400).json({
                    ok:false,
                    msg:'El correo ya esta registrado'
                })
            }
        const usuario = new Usuario(req.body);

        //Contraseña con seguridad(Encriptada)

        const salt = bcrypt.genSaltSync();
        usuario.password= bcrypt.hashSync(password, salt)
        
        //Guardar usuario en BD
        await usuario.save();

        //Generar JWT 
        const token = await generarJWT(usuario.id);

        res.json({
            ok:true,
            usuario,
            token
        })
       
        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:'Por favor verificar'
        })
        
    }



} 
const actualizarUsuario = async(req, res=response)=>{
    const uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(400).json({
                msg: 'No eviste un usuario por ese id'
            })
        }
        

        //Actualizaciones
        const {password, google, email, ...campos} = req.body;
        if(usuarioDB.email !== email){

            const existeEmail= await Usuario.findOne({email});

            if(existeEmail){
                return  res.status(400).json({
                    ok:false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }
        campos.email= email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new:true});


        res.json({
            ok:true,
            usuario:usuarioActualizado

        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }
}

const borrarUsuario=  async (req, res=response)=>{
    const uid = req.params.id
    try {
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                msg: 'No existe un usuario por ese id'
            })
        }
        await Usuario.findByIdAndDelete(uid);
      
        res.json({
            ok:true,
            msg:'El usuario se elimino'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'No se pudo borrar'
        })
        
    }
}

   
module.exports={
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}