/*
	SISTEMA ESCOLAR
*/
var express			=	require('express');					//	'importa' o express e o instancia.
var app 			=	express();
var port 			=	process.env.PORT || 3000;			//	Seta qual porrta vai ser chamada

var passport		= 	require('passport');
var flash   		= 	require('connect-flash');

var morgan			=	require('morgan');					//	Morgan detalha no console
var cookieParser	=	require('cookie-parser');
var bodyParser		=	require('body-parser');				//	Body-parser pega as infos dos forms
var	session 		=	require('express-session'); 

//var connDB			=	require('./models/mysqlmodule');	//	importa module de connection mysql
// connDB.connection;


/*

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
    
});
var qr= "select * from usuario where matricula = 1";
           
connection.query("select * from usuario",function(error, rows, fields){
	if(!!error){
		console.log("erro");
	}else {
			console.log("foi");
			console.log(rows[0].matricula);
	}});
*/































											//	Conecta no banco


/*CONFIGS*/
		
/*Cookies,logs,...*/
		app.use(morgan('dev'));								//	Mostra as chamadas 
		app.use(cookieParser()); 							//	cookies(autenticação e pá)
		app.use(bodyParser.urlencoded({ extended: true }));	//	captura as infos dos forms em html
		app.use(bodyParser.json());	

		  
		app.use(flash()); 									//	mensagens flash gravadas na sessao
	/*Engine*/
		app.set('view engine', 'ejs');						//	configura a engine view
		app.use('/assets', express.static(__dirname + '/public'));
	/*Rota*/
		/*Passport*/
		require('./config/passport')(passport);
		app.use(session({ secret: 'ylrm'})); 				// Mudar sempre 
		app.use(passport.initialize());
		app.use(passport.session()); 


		require('./routes')(app, passport);					//	Referença pro routes.js


app.listen(port);											//	ABRE SERVIDOR	
console.log('Server em :' + port);

 /*

app.get('/teste', function (req,res){
	res.send("funcionou")

}); */


