exports.index		=	function(request, response){
    response.render('paginas/index',{	user: request.user.username });
};
exports.teste		=	function(request, response){
    response.render('paginas/teste');
};
exports.login 		=	function(request, response){
	response.render('paginas/login',	{ message: request.flash('MSGLogin') });
};
exports.cadastro	=	function(request, response){
    response.render('paginas/cadastro', { message: request.flash('MSGCad')	 });
};
exports.logOut		=	function(request, response){
	request.logout();
	response.redirect('/');
};

exports.calendario      =   function(request, response){
  response.render('paginas/calendario',{  user: request.user.username ,  matricula: request.user.matricula     });
   
};
exports.cadastroQuest		=	function(request, response){

    response.render('paginas/cadastroQuest',{  message: request.flash('MSGCadQuest','Dados Gravados Com sucesso'), user: request.user.username     });

};
exports.consultaProvas      =   function(request, response){
    response.render('paginas/consultaProvas',{  user: request.user.username     });
};
exports.cadastroProvas		=	function(request, response){
    response.render('paginas/cadastroProvas',{  user: request.user.username     });
};
exports.consultaQuest		=	function(request, response){
    response.render('paginas/consultaQuest',{  user: request.user.username     });
};
exports.consultaProf		=	function(request, response){
    response.render('paginas/consultaProf',{  user: request.user.username     });
};
exports.consultaTurma		=	function(request, response){
  response.render('paginas/consultaTurma',{  user: request.user.username ,  matricula: request.user.matricula     });

};
exports.consultaAluno		=	function(request, response){
    response.render('paginas/consultaAluno',{  user: request.user.username     });
};
exports.cadastroNotas		=	function(request, response){
    response.render('paginas/cadastroNotas',{   user: request.user.username     });
};
exports.diarioPresenca		=	function(request, response){
    response.render('paginas/diarioPresenca',{  user: request.user.username ,  matricula: request.user.matricula          });
};

