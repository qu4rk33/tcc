var HomeController = require('./controllers/HomeController');



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

            app.post('/cadastroQuest', passport.authenticate('cadastroQuest', {
              successRedirect : '/cadastroQuest',
              failureRedirect : '/cadastroQuest',
              failureFlash : true
        }));


};
function isLogged(request, response, next) {
    if (request.isAuthenticated())
      return next();

    response.redirect('/');
}
