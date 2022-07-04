//RUTAS
const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuario.controler');

//FRAMEWORK
const {check} = require('express-validator')
const {Router} = require('express');
const { validarcampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');
const router = Router();

router.get('/', validarJWT , getUsuarios)

router.post('/',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contrseña es obligatoria').not().isEmpty(),
    validarcampos
],
 crearUsuarios )

router.put('/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contrseña es obligatoria').not().isEmpty(),
        validarcampos,
        
    ] , actualizarUsuario)

router.delete('/:id', 
    [
     validarJWT  
    ] , borrarUsuario)

module.exports= router;