const {Router} = require('express');
const { login } = require('../controllers/auth.controllers');
const {check} = require('express-validator');
const { validarcampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatorio').not().isEmpty(),
        validarcampos
    ],
    login )




module.exports= router;