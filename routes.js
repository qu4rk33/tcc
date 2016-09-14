var HomeController = require('./controllers/HomeController');
//Routes - redirecionar]


module.exports = function(app,passport) {
		//Pagninas Principais
			app.get('/index',HomeController.index);
			app.get('/teste',isLogged,HomeController.teste);
			app.get('/', HomeController.login);
			
            app.post('/', passport.authenticate('local', {
            successRedirect : '/index', // redirect to the secure profile section
            failureRedirect : '/', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages

        }));
             

};
function isLogged(request, response, next) {

    // if user is authenticated in the session, carry on 
    if (request.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    response.redirect('/');
}


 

  // =====================================
   
    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
   // app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
   //     res.render('signup.ejs', { message: req.flash('signupMessage') });
    //});

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
 
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    /*app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
*/
    // =====================================
    // LOGOUT ==============================
    // =====================================
    //app.get('/logout', function(req, res) {
    //    req.logout();
     //   res.redirect('/');
   // });
//};

// route middleware to make sure a user is logged in








