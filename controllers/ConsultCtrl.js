var connDB = require('../models/mysqlmodule.js');

exports.removerQuest   = 	function(req, res){
  console.log("Entrou 1");
      var questoes = [];
      var qry =  "DELETE FROM `questoes` WHERE cod_quest = '"+ req.body.codigo_quest +"'" ;
      connDB.query(qry,function(err,rows){
        if (err)
        req.flash('MSGCadQuest', err);
        else {
          console.log("Deletado! ");
        }
      });
};


exports.pesquisateste   = 	function(req, res){
//  console.log("Entrou 1");
      var questoes = [];
      var qry =  "SELECT questoes.enunciado, questoes.gabarito, questoes.cod_quest FROM questoes WHERE autor= '" + req.body.autor + "' and nivel = '"+ req.body.nivel +"' and tipo = '"+ req.body.tipo +"' and disciplina_id = (SELECT `disciplina_id` FROM `disciplinas` WHERE disciplina_nome = '"+ req.body.disciplina +"') AND materia_id = (SELECT `materia_id` FROM `materia` WHERE nome = '"+ req.body.materia +"' ) AND ano_letivo = '"+ req.body.creation +"' AND anoserie = '"+ req.body.serie +"' GROUP BY enunciado" ;
      console.log(qry);
      connDB.query(qry,function(err,rows){
        if (err)
        req.flash('MSGCadQuest', err);
        if (rows.length) {

                 for (var i = 0, len = rows.length; i < len; i++) {
                    questoes.push([rows[i].enunciado, rows[i].gabarito, rows[i].cod_quest ]);
                 }
                 console.log(questoes);
                 res.json(questoes);
        }
      });
};


exports.listalunos	=	function(req, res){

  var listaalunos = [];  // AQUI FOI CRIADO UM ARRAY QUE VAI COMPORTAR OS RESULTADOS .
  var qry = "select nome, aluno.matricula from aluno, turma_aluno where cod_turma = '"+req.body.nometurma+"' AND aluno.matricula=turma_aluno.matricula ORDER BY nome";
  console.log(qry);
  connDB.query(qry,function(err,rows){
    for (var i = 0, len = rows.length; i < len; i++)
      {
        //console.log()
        //listaalunos.push(rows[i].nome);
        listaalunos.push([rows[i].nome, rows[i].matricula]);

        //nunes, é aqui que deveria pegar os nomes ? sim, e jogar na array tbm. vejamos cod_turma nao é nome..... mt bem observado
            }
  res.json(listaalunos);
 console.log(listaalunos);

  });


};

exports.pesquisaturma	=	function(req, res){

  var consulTurmas = [];  // AQUI FOI CRIADO UM ARRAY QUE VAI COMPORTAR OS RESULTADOS .
  connDB.query("select cod_turma from prof_turma where matricula = '"+req.body.matricula+"' ",function(err,rows){
    for (var i = 0, len = rows.length; i < len; i++)
      {
        consulTurmas.push(rows[i].cod_turma);
      }
      console.log(consulTurmas);
  res.json(consulTurmas);

  });


};













//     var lines = process.stdout.getWindowSize()[1];
//      for(var i = 0; i < lines; i++) {
//          console.log('\r\n');
//          console.log('\r\n');
//          console.log('\r\n');
//
//      }
