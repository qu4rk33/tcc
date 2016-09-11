// 'importa' o express e o instancia.
var express = require('express');
var app = express();

//importa module de connection mysql
//var greet = require('./models/mysqlmodule');
/*
var misc = require('./misc');
console.log("Adding %d to 10 gives us %d", misc.x, misc.addX(10));
*/
var port = process.env.PORT || 3000;

app.set('view engine', 'ejs'); // configura a engine view
app.use('/assets', express.static(__dirname + '/public'));

//route 'rota' para quando a index for acessada

require('./routes')(app); 	//Referença pro routes.js
 /*
app.get('/', function (req, res) {
	res.render('paginas/index');
});

app.get('/teste', function (req,res){
	res.send("funcionou")

}); */

app.listen(port);


// Failed to lookup view "paginas/Inx"ês
// in views directory "/home/yurr/sistEscolar/tcc_sistescolar/views"
