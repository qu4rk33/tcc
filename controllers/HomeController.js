exports.index = function(request, response){
    response.render('paginas/index',{
    	user: request.user
    });
};
exports.teste = function(request, response){
    response.render('paginas/teste');
};
exports.login = function(request, response){
	response.render('paginas/login', { message: request.flash('loginMessage') });
};

// app.get(definida no routes , f definida hoomeCOntroller;
