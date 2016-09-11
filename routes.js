var HomeController = require('./controllers/HomeController');
//Routes - redirecionar
module.exports = function(app) {
		//Pagninas Principais
			app.get('/index',HomeController.index);
			app.get('/teste',HomeController.teste);
			app.get('/', HomeController.login);

}


/*
module.exports = function(app){

    // Main Routes

    app.get('/', function(request, response){

    });

    app.get('/other', function(request, response){

    });

};


app.get('/', function (req, res) {
	res.render('paginas/index');
});

app.get('/teste', function (req,res){
	res.send("funcionou");

});




*/
