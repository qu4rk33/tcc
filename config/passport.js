// config/passport.js
var mysql            =   require('mysql');
var LocalStrategy  =   require('passport-local').Strategy;
var connDB           =   mysql.createConnection({
    host        :'localhost',
    user        :'root',
    password    :'',
    database    :'sge'
});
 connDB.connect(function(err){
    if(!err){
      console.log("Conectado com sucesso... \n\n");
    }else{
      console.log("Err0 ao se conectar... \n\n");
    }
    
});
           
/*connDB.query("select senha from usuario where matricula=1",function(error, rows, fields){
    if(!!error){
        console.log("erro");
    }else {
            console.log(rows[0].senha);
    }});
*/




















module.exports = function(passport) {      
  /* passport.serializeUser(function(user, done) {
        done(null, user.id);
    console.log('aqui');
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connDB.query("select * from usuario where matricula = "+ email+"",function(err,rows){   
            done(err, rows[0]);
        });
    });*/
    
    passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


    passport.use('local', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

            console.log("teste");
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
var qr= "select * from usuario where matricula =" + email +" ";
console.log(qr);
            connDB.query("select * from usuario where matricula =" + email +"",function(error, rows, fields){
                console.log("cheirinhoDoHepta");
    if(!!error){
        return done(error);
    }

    /*else {
     AQUI VAI       console.log(rows[0].senha);
    }*/
        if (!( rows[0].senha == password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
        
        return done(null,rows[0]);

});

           /*connDB.query("SELECT * FROM usuario WHERE matricula = '" + matricula + "' ",function(err,rows){
                if (err)
                    return done(err);
                 if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                } 
                // if the user is found but the password is wrong
                if (!( rows[0].senha == senha))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                
                // all is well, return successful user
                return done(null, rows[0]);         
            
            });*/


    }));

};