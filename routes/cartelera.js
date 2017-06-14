var express = require("express");
var router = express.Router();

//Obtener las Peliculas
//PATH  /cartelera
router.get("/", (req, res, next)=> {

    req.db.query("SELECT * FROM cartelera", (err, results)=>{
        if(err){
            res.send([]);
        }
        else{
            res.send(results);
        }
    });
    
});

//Obtener una Pelicula
//PATH /estreno/id
router.get("/:id", (req, res, next)=> {
    let.id = req.params.id;    
    req.db.query("SELECT * FROM cartelera WHERE idcartelera = "+id, (err, results)=>{
        if (err || results.length == 0){
            res.status(404).send({msg: "El estreno no existe"});
        }
        else{
            res.send(results[0]);
        }
    });    
});



//para insertar en la base de datos
//Insertar Estreno
//PATH /cartelera
router.post("/", (req, res, next)=> {
    let body = req.body;
    req.db.query("INSERT INTO cartelera SET nombre = ?, genero1 = ?, genero2 = ?, duracion = ?, clasificacion = ?, precio = ? ",
     [body.nombre, body.genero1, body.genero2, body.duracion, body.clasificacion, body.precio], (err, results)=>{
        if(err){
            res.send({success:false}); 
        }
        else{
            res.send({success:true});
        }
    });
});

//para actualizar recurso
//Actualizar cartelera
//PATH /cartelera
router.put("/:id", (req, res, next)=> {
    let body = req.body;
    req.db.query("UPDATE cartelera SET nombre = ?, genero1 = ?, genero2 = ?, duracion = ?, clasificacion = ?, precio = ? WHERE idcartelera = ?"
    , [body.nombre, body.genero1, body.genero2, body.duracion, body.clasificacion, body.precio, req.params.id], (err, results)=>{

        if(err){
            res.send({success:false});
        }
        else{
            res.send({success:true});
        }                    
    });
});

//para eliminar una pelicula de cartelera

router.delete("/:id", (req, res, next)=> {
    req.db.query("DELETE FROM cartelera WHERE idcartelera = ?", [req.params.id], (err, results)=>{
       if(err){
            res.send({success:false});
        }
        else{
            res.send({success:true});
        }   
    });        
});

module.exports = router;