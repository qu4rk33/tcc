var HomeController = require('./controllers/HomeController');
var CadController = require('./controllers/CadController');
var ConsultCtrl = require('./controllers/ConsultCtrl');
var TestCTRL = require('./controllers/TestCTRL');
var bodyParser = require('body-parser').json();



module.exports = function(app,passport) {
        //Pagninas Principais
            app.get('/index',isLogged,HomeController.index);
            app.get('/teste',isLogged,HomeController.teste);
            app.get('/cadastro',HomeController.cadastro);
            app.get('/', HomeController.login);
            app.get('/logout', HomeController.logOut);
            app.get('/cadastroQuest',isLogged, HomeController.cadastroQuest);
            app.get('/cadastroProvas',isLogged, HomeController.cadastroProvas);
            app.get('/cadastroNotas',isLogged, HomeController.cadastroNotas);
            app.get('/diarioPresenca',isLogged, HomeController.diarioPresenca);
            app.get('/consultaQuest',isLogged, HomeController.consultaQuest);
            app.get('/consultaProf',isLogged, HomeController.consultaProf);
            app.get('/consultaTurma',isLogged, HomeController.consultaTurma);
            app.get('/consultaAluno',isLogged, HomeController.consultaAluno);



            app.post('/cadastro', passport.authenticate('cadastro', {
            successRedirect : '/',
            failureRedirect : '/cadastro',
            failureFlash : true
        }));

            app.post('/', passport.authenticate('login', {
            successRedirect : '/index',
            failureRedirect : '/',
            failureFlash : true,
        }));


            app.post('/cadastroQuest', CadController.cadastroQuest);
            app.post('/cadastroProva', CadController.cadastroProva);
            app.post('/deletarQuest', ConsultCtrl.removerQuest);
            app.post('/pesqMat', CadController.pesquisaMat);
            app.post('/pesqDisc', CadController.pesquisaDisc);
            app.post('/pesqQuest', CadController.pesquisaQuest);
            app.post('/pesca/:disciplina', TestCTRL.pesquisaMorte);
            app.post('/pesca', TestCTRL.pesquisaMorte2);
            app.post('/pescaconsul', ConsultCtrl.pesquisateste);
            app.post('/mostraturma', ConsultCtrl.pesquisaturma);
            app.post('/pegaaluno', ConsultCtrl.listalunos);

            /*-----------Calendario---------------------------------*/
            app.post('/cadastroEvento', CadController.cadastroEvento);
           
            app.post('/pesquisaEvento', ConsultCtrl.pesquisaEvento);
            app.get('/pesquisaEvento', ConsultCtrl.pesquisaEvento);


};
function isLogged(request, response, next) {
    if (request.isAuthenticated())
      return next();

    response.redirect('/');
}
