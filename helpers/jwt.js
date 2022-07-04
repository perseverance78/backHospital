const jwt = require('jsonwebtoken');

const generarJWT= (uid)=>{
    return new Promise((resolve, reject)=>{


        const payload={
            uid
        }
        jwt.sign( payload, process.env.JWT, {expiresIn: '6h'},
        (err, token)=>{
    
            if(err){
                console.log(err);
                reject('No se genero el JWT')
            }else{
                resolve(token);
            }
    
        } );
    })

    

}


module.exports={
    generarJWT
}