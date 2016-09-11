exports.index = function(request, response){
    response.render('paginas/index');
};
exports.teste = function(request, response){
    response.render('paginas/teste');
};
exports.login = function(request, response){
	response.render('paginas/login');
};

// app.get(definida no routes , f definida hoomeCOntroller;
