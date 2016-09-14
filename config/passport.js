// config/passport.js
var mysql            =   require('mysql');
var LocalStrategy  =   require('passport-local').Strategy;
var connDB           =   mysql.createConnection({
    host        :'localhost',
    user        :'root',
    password    :'',
    database    :'sge'
});
console.log('teste');
 connDB.connect();
var qr= "select * from usuario where matricula = 1";
           
connDB.query(qr, function(err, rows, fields) {
    if (err) throw err;
 
    for (var i in rows) {
        console.log('Post Titles: ', rows[i].post_title);
    }
});





















module.exports = function(passport) {      













    
   passport.serializeUser(function(user, done) {
        done(null, user.id);
    console.log('aqui');
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connDB.query("select * from usuario where matricula = "+ matricula,function(err,rows){   
            done(err, rows[0]);
        });
    });
    

    passport.use('local', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'matricula',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, matricula, password, done) { // callback with email and password from our form

            console.log("teste");
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists

           connDB.query("SELECT * FROM usuario WHERE matricula = '" + matricula + "' ",function(err,rows){
                if (err)
                    console.log("foi");
                    return done(err);
                 if (!rows.length) {
                    console.log("foi");
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                } 
                console.log("foi");
                // if the user is found but the password is wrong
                if (!( rows[0].password == password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                
                // all is well, return successful user
                return done(null, rows[0]);         
            
            });


    }));

};