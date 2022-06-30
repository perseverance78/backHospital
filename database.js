const mongoose= require('mongoose');
require('dotenv').config();


const connectDB = async ()=>{
    try {

        await mongoose.connect(process.env.CONDB);
        console.log('SE CONECTO CORRECTAMENTE A LA BD')
        
    } catch (error) {
        console.log(error)
        
    }
}

module.exports={
    connectDB
}
    



