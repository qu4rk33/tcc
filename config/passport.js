// config/passport.js
var mysql                =   require('mysql');
var LocalStrategy        =   require('passport-local').Strategy;
var connDB               =   mysql.createConnection({
  host        :'localhost',
  user        :'root',
  password    :'',
  database    :'sge'
});

//tipo isso, sim, isso ai é o que iniciainstancia o boanco.
connDB.connect(function(err){                                                         //Inicia e testa connec com o BD
  if(!err){ console.log("Funcionou... \n");
}else{
  console.log("Err0r... \n");
}

});

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {                                      //Requeridos para a autenticação pelo passport
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  passport.use('cadastro', new LocalStrategy({

    usernameField     :   'email',
    passwordField     :   'senha',
    passReqToCallback :   true                                                      // pode retornar tudo do
  },
  function(req, email, password, done) {
    var matricula    =   req.body.matricula;                                         //Var teste pra pegar o valor  do html
    connDB.query("select * from usuario where matricula = '"+ matricula +"'",function(err,rows){
      if (err)
      return done(err);
      if (rows.length) {
        return done(null, false, req.flash('MSGCad', 'Matricula já em uso '));
      } else {
        var insertUser = "INSERT INTO usuario ( matricula,username,senha,permissao ) values ('" + matricula +"','" + req.body.nome +"','" + password +"','"+ req.body.categoria +"')";
        connDB.query(insertUser,function(err,rows){});
        if(req.body.categoria == "Professor")
        {
          var insertProf  =   "INSERT INTO profs (matricula, nome, data_nasc, cpf, telefone_celular, email) values ('" + req.body.matricula +"','" + req.body.nome +"','" + req.body.data +"','" + req.body.cpf +"','" + req.body.celular +"','"+ email +"') "
          connDB.query(insertProf,function(err,rows){
            return done(null,  req.flash('MSGLogin', 'Dados Gravados com sucesso'));
          });

        }
      }
    });
  }));


  passport.use('login', new LocalStrategy({
    usernameField     : 'matricula',
    passwordField     : 'senha',
    passReqToCallback : true
  },
  function(req, matricula, password, done) {
    connDB.query("select * from usuario where matricula =" + matricula +"",function(error, rows, fields){
      if(!!error)
      return done(error);
      if (rows[0]){
        if (!(rows[0].senha == password))
        return done(null, false, req.flash('MSGLogin', 'Oops! Senha errada.'));
      }else
      return done(null, false, req.flash('MSGLogin', 'Usuario nao cadastrado.'));

      var usuario = new Object();                                                            //Cria um objeto com o usuario, mas é uma variavel das trevas. YOU SHALL NOT TOUCH IT
      usuario.id    = rows.Matricula;

      return done(null,rows[0]);
    });
  }));


  passport.use('cadastroQuest', new LocalStrategy({

    usernameField : 'email',
    passwordField : 'senha',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {

    console.log(req.body.data);


    var matricula    =   req.body.autor;
    var visibilidade = req.body.visibilidade;
    var disciplina = req.body.disciplina;
    var materia = req.body.materia;
    var serie = req.body.serie;
    var anoCriacao = req.body.criacao;
    var tipo = req.body.tipo;
    var nivel = req.body.nivel;
    var enunciado = req.body.enunciado;
    var gabarito = req.body.gabarito;

    connDB.query("select * from questoes where enunciado = '"+ enunciado +"'",function(err,rows){
      if (err)
      return done(err);
      if (rows.length) {
        return done(null, false, req.flash('MSGCadQuest', 'Questão já existente!')); //Aqui ele retorna a msg se a qstao ja existir
      } else {

        if(tipo == "Discursiva")
        {
          var insertQuest = "INSERT INTO `questoes`(`cod_quest`, `autor`, `nivel`, `tipo`, `disciplina_id`, `materia_id`, `enunciado`, `gabarito`, `ano_letivo`, `anoserie`, `visibilidade`) VALUES('', '"+ autor +"', '"+ nivel +"', '"+ tipo +"', '"+ disciplina +"', '"+ materia +"', '"+ enunciado +"', '"+ gabarito +"', '"+ anoCriacao +"', '"+ serie +"', '"+ visibilidade +"')";
          connDB.query(insertQuest,function(err,rows){});
        }

        else if (tipo == "Objetiva") {
          var opcoes = {
            a : req.body.opcA,
            b : req.body.opcB,
            c : req.body.opcC,
            d : req.body.opcD,
            e : req.body.opcE,
          }
          var insertQuest = "INSERT INTO `questoes`(`autor`, `nivel`, `tipo`, `disciplina_id`, `materia_id`, `enunciado`, `op1`, `op2`, `op3`, `op4`, `op5`, `gabarito`, `ano_letivo`, `anoserie`, `visibilidade`) VALUES('" + autor + "', '" + nivel + "', '" + tipo + "', '" + disciplina + "', '" + materia + "', '" + enunciado + "', '" + opcoes.a + "', '" + opcoes.b + "', '" + opcoes.c + "', '" + opcoes.d + "', '" + opcoes.e + "', '" + gabarito + "', '" + anoCriacao + "', '" + serie + "', '" + visibilidade + "', )";
          connDB.query(insertQuest,function(err,rows){});
        }
      }
    });




  }));


























};
