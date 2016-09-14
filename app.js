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

var connDB			=	require('./models/mysqlmodule');	//	importa module de connection mysql
// connDB.connection;											//	Conecta no banco


/*CONFIGS*/
		
/*Cookies,logs,...*/
		app.use(morgan('dev'));								//	Mostra as chamadas 
		app.use(cookieParser()); 							//	cookies(autenticação e pá)
		app.use(bodyParser.urlencoded({ extended: true }));	//	captura as infos dos forms em html
		app.use(bodyParser.json());	
	/*Passport*/
		app.use(session({ secret: 'ylrm',
				cookie:{
					secure:false
				}
				})); 				// Mudar sempre 
		app.use(passport.initialize());
		app.use(passport.session()); 
		  require('./config/passport')(passport);
		app.use(flash()); 									//	mensagens flash gravadas na sessao
	/*Engine*/
		app.set('view engine', 'ejs');						//	configura a engine view
		app.use('/assets', express.static(__dirname + '/public'));
	/*Rota*/
		require('./routes')(app, passport);					//	Referença pro routes.js


app.listen(port);											//	ABRE SERVIDOR	
console.log('Server em :' + port);

 /*

app.get('/teste', function (req,res){
	res.send("funcionou")

}); */


