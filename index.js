const express = require('express');
require('dotenv').config();
const {connectDB} = require('./database')
const cors = require('cors');



const app = express();


//Esto es middlewares que para lo que sirve es para usar este en todas las lineas
//que siguen despues. Y tambien que la información venga como se espera.
app.use(cors())

//Lectura y parseo del body
app.use(express.json())

//Conexion BD
connectDB();

app.use('/api/usuarios', require('./routes/usuario.routes') );
app.use('/api/login', require('./routes/auth.routes') );



app.listen(process.env.PORT, ()=>{
    console.log(`El servidor se inicializo en el puerto ${process.env.PORT}`)
})