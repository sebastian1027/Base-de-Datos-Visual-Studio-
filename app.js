var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require("cors");

var mysql = require('mysql');
var cartelera = require('./routes/cartelera');
var users = require('./routes/users');

var con = mysql.createConnection({host: "localhost", database:"peliculas", user:"root", password:""})
con.connect((err)=>{
  if(err){
    console.log(err);
  }else{
    console.log("Conección a Mysql Exitosa");
  }
});
var app = express();
app.use(cors());

app.use((req, res, next)=>{
  req.db = con;  
  next(); //esta funcion puede ser parametro de otra funcion, como en este caso
  //es dinamico: puedo agregar o quitar atributos en tiempo de ejecucion

});



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/cartelera', cartelera);
app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}); //capturas del error

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
