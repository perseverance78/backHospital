const express = require('express');
require('dotenv').config();
const {connectDB} = require('./database')
const cors = require('cors');



const app = express();

connectDB();
app.use(cors())

app.get('/',(req, res)=>{
    res.json({
        res: 'hola'
    })

})



app.listen(process.env.PORT, ()=>{
    console.log(`El servidor se inicializo en el puerto ${process.env.PORT}`)
})