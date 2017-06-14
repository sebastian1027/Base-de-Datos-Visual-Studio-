var express = require("express");
var router = express.Router();

router.post("/registro", (req, res, next)=>{
    let body = req.body;
    req.db.query("SELECT * FROM usuarios WHERE usuario = ?", [body.usuario], (err, results)=> {
        if (results.length > 0) {            
            res.send({ success: false, exist: true, msg:"EL Usuario ya se encuentra registrado" });
        }else{
            req.db.query("INSERT INTO usuarios SET nombre = ?, apellido = ?, email = ?, edad = ?, usuario = ?, password = ?",             
            [body.nombre, body.apellido, body.email, body.edad, body.usuario, body.password], (err, result)=> {
                if(err){
                    res.send({ success: false, exist: false, msg:"Error al registrar usuario" });
                }else{
                    res.send({ success: true, exist: false });
                }
            });
        }
    });
});

router.post("/login", (req, res, next)=>{
    let body= req.body;
    req.db.query("SELECT * FROM usuarios WHERE usuario = ? AND password = ?", [body.usuario, body.password], (err, results)=>{   

        if(err){
            res.send({success:false, msg:"Error al inciar sesion"});
        }else if(results.length == 0 ){
            res.send({success:false, msg:"Usuario o password incorrectos"});
        }else{
            res.send({success:true});
}
    });
});

module.exports = router;
