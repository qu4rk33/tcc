/*
	SISTEMA ESCOLAR
*/
var express			=	require('express');					// 'importa' o express e o instancia.
var app 			=	express();
var morgan			=	require('morgan');					// log requests to the console (express4)
var bodyParser		=	require('body-parser');				// pull information from HTML POST (express4)
var methodOverride	=	require('method-override');			// simulate DELETE and PUT (express4)

var conn			=	require('./models/mysqlmodule');	//importa module de connection mysql
conn.connection;											//Conecta no banco

var port 			=	process.env.PORT || 3000;

/*CONFIGS*/
app.set('view engine', 'ejs');								// configura a engine view
app.use('/assets', express.static(__dirname + '/public'));


require('./routes')(app);									//Referença pro routes.js


app.listen(port);											//ABRE SERVIDOR	


 /*

app.get('/teste', function (req,res){
	res.send("funcionou")

}); */