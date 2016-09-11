//Module with functions to control BD
var mysql       = require('mysql');
var connection  = mysql.createConnection({
    host        :'',
    user        :'',
    password    :'',
    database    :''
});

connection.connect(function(err){
    if(!err){
      console.log("Conectado com sucesso... \n\n");
    }else{
      console.log("Err0 ao se conectar... \n\n");
    }
});
//EXEMPLO DE CONECTOES
connection.query('SELECT * from NOMEDATABELA', function(err, rows, fields){
  if(!err)
    console.log(' ... : ', rows);
  else
    console.log('ERR00R');
});
connection.query('INSERT INTO posts SET ?', {title: 'test'}, function(err, result) {
  if (err) throw err;

  console.log(result.insertId);
});
connection.query('UPDATE posts SET ...', function (err, result) {
  if (err) throw err;

  console.log('changed ' + result.changedRows + ' rows');
})
connection.query('DELETE FROM posts WHERE title = "wrong"', function (err, result) {
  if (err) throw err;

  //console.log('deletadas ' + result.affectedRows + ' rows');
})

connection.end();
