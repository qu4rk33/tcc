//Caiu em desuso
var mysql       = require('mysql');
var connection  = mysql.createConnection({
    host        :'localhost',
    user        :'yurr',
    password    :'123',
    database    :'sge'
});
  
connection.connect(function(err){
    if(!err){
      console.log("Conectado com sucesso... \n\n");
    }else{
      console.log("Err0 ao se conectar... \n\n");
    }
    connection.end();
});

