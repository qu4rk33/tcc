var connDB = require('../models/mysqlmodule.js');





exports.pesquisaDisc = function(req, res){

    var disciplinas = [];
    connDB.query("select * from disciplinas ",function(err,rows){
      if (err)
      request.flash('MSGCadQuest', err);
      if (rows.length) {

               for (var i = 0, len = rows.length; i < len; i++) {
                  disciplinas.push(rows[i].disciplina_nome);
               }
               res.json(disciplinas);



      }

    });

};

exports.pesquisaMat = function(request, res){
    var materias = [];


    connDB.query("SELECT * FROM `materia`, disciplinas WHERE materia.disciplina_id = disciplinas.disciplina_id AND disciplinas.disciplina_nome = '"+ request.body.disciplina +"'",function(err,rows){
      if (err)
      request.flash('MSGCadQuest', err); //Aqui ele retorna a msg se a qstao ja existir
      if (rows.length) {

               for (var i = 0, len = rows.length; i < len; i++) {
                  materias.push(rows[i].nome);
               }
               res.json(materias);



      }

    });

};

exports.pesquisaQuest = function(request, response){

    var questoes = [];

    console.log(request.body.materia);

    connDB.query("SELECT questoes.enunciado, questoes.nivel, questoes.tipo FROM `questoes`, disciplinas, materia WHERE materia.nome = '"+ request.body.materia + "' AND materia.materia_id = questoes.materia_id GROUP BY enunciado",function(err,rows){
      if (err)
      request.flash('MSGCadQuest', err);
      if (rows.length) {

               for (var i = 0, len = rows.length; i < len; i++) {
                  questoes.push([rows[i].enunciado, rows[i].nivel, rows[i].tipo]);
               }
               response.json(questoes);



      }

    });

};


exports.cadastroProva		=	function(request, response, next){
  var dados = request.body.dados;
  var qry= "";
  console.log(qry);
  connDB.query(qry,function(err,rows){
    if (err)
      console.log("erro ao inserir la na prova");
      for(x=1; x<=dados.length; x++){
        console.log(dados[x]);

        connDB.query("INSERT INTO `prova_questoes` VALUES ((SELECT LAST(cod_prova) FROM provas),(SELECT `cod_quest` FROM `questoes` WHERE enunciado = '"+ dados[x] +"' ))",function(err,rows){
            if (err)
            request.flash('MSGCadQuest', err);

          });
      }

});

};

exports.cadastroQuest		=	function(request, response, next){
  console.log("Renan n faz nada");

  var autor    =   request.body.autor;
  var visibilidade = request.body.visibilidade;
  var disciplina= request.body.disciplina;
  var materia   = request.body.materia;
  var serie     = request.body.serie;
  var anoC      = request.body.criacao;
  var tipo      = request.body.tipo;
  var nivel     = request.body.nivel;
  var enunciado = request.body.enunciado;
  var gabarito  = request.body.gabarito;

  connDB.query("select * from questoes where enunciado = '"+ enunciado +"'",function(err,rows){
  if (err)
  request.flash('MSGCadQuest', err); //Aqui ele retorna a msg se a qstao ja existir
  if (rows.length) {
   request.flash('MSGCadQuest', 'Questão já existente!'); //Aqui ele retorna a msg se a qstao ja existir
  } else {

    if(tipo == "Discursiva")
    {
      var insertQuest = "INSERT INTO `questoes`(`cod_quest`, `autor`, `nivel`, `tipo`, `disciplina_id`, `materia_id`, `enunciado`, `gabarito`, `ano_letivo`, `anoserie`, `visibilidade`) VALUES('', '"+ autor +"', '"+ nivel +"', '"+ tipo +"', (SELECT `disciplina_id` FROM `disciplinas` WHERE disciplina_nome = '"+ disciplina + "' ), (SELECT `materia_id` FROM `materia` WHERE nome = '" + materia + "' ), '"+ enunciado +"', '"+ gabarito +"', '"+ anoC +"', '"+ serie +"', '"+ visibilidade +"')";
      connDB.query(insertQuest,function(err,rows){});
    }else if (tipo == "Objetiva") {
      var opcoes = {
        a : request.body.opcA,
        b : request.body.opcB,
        c : request.body.opcC,
        d : request.body.opcD,
        e : request.body.opcE,
      }
      var insertQuest = "INSERT INTO `questoes`(`autor`, `nivel`, `tipo`, `disciplina_id`, `materia_id`, `enunciado`, `op1`, `op2`, `op3`, `op4`, `op5`, `gabarito`, `ano_letivo`, `anoserie`, `visibilidade`) VALUES('" + autor + "', '" + nivel + "', '" + tipo + "', (SELECT `disciplina_id` FROM `disciplinas` WHERE disciplina_nome = '"+ disciplina + "' ), (SELECT `materia_id` FROM `materia` WHERE nome = '" + materia + "' ), '" + enunciado + "', '" + opcoes.a + "', '" + opcoes.b + "', '" + opcoes.c + "', '" + opcoes.d + "', '" + opcoes.e + "', '" + gabarito + "', '" + anoC + "', '" + serie + "', '" + visibilidade + "', )";
      connDB.query(insertQuest,function(err,rows){
        request.flash('MSGCadQuest', 'Questao Cadastrada!');
       });
    }
  }

  return   response.render('paginas/cadastroQuest', {message: request.flash('MSGCadQuest','Dados Gravados Com sucesso'), user: request.user.username});
});



};
