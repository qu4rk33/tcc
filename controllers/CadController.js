var connDB = require('../models/mysqlmodule.js');

exports.pesquisaDisc = function(req, res){

    var disciplinas = [];
    connDB.query("select * from disciplinas ",function(err,rows){
      if (err)
      req.flash('MSGCadQuest', err);
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

exports.cadastroDiario  = function(request,response, next){
    var qry="INSERT INTO prof_diario(matricula,turma,data,disciplina_id,comentario) VALUES ()";

    console.log(request.body.chk);
};


exports.cadastroProva   = function(request, response, next){
  var dados = request.body.dados;
  var qry= "INSERT INTO `provas`(`matricula`, `cod_disciplina`, `anoserie`, `tipo_avaliacao`)  SELECT `matricula`,`disciplina_id` , '"+ request.body.serie +"','"+ request.body.tipo +"' FROM `profs`,`disciplinas` WHERE nome = '"+ request.body.autor +"' AND  disciplina_nome = '"+ request.body.disciplina +"'  " ;
  var confirm= 0;
  console.log(qry);
  connDB.query(qry,function(err,rows){
    if (err)
      console.log("erro ao inserir la na prova");


    confirm=1;
      console.log(confirm);

  });
  if(confirm !=1){
    console.log(confirm ==1);
    console.log("aqui");

    for(x=1; x<dados.length; x++){
      console.log("aqui");
      var qry2= "INSERT INTO `prova_questoes` SELECT provas.cod_prova, questoes.cod_quest FROM provas, questoes WHERE questoes.enunciado = '"+ request.body.dados[x] +"' ";
      console.log(qry2);
      connDB.query(qry2,function(err,rows){
        if(err){
    console.log('Error connecting to Db');
    return;
    }
    console.log('Connection established');


        });
    }

  }

};

exports.cadastroQuest   = function(request, response, next){
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
  if (rows.length) 
    request.flash('MSGCadQuest', 'Questão já existente!'); //Aqui ele retorna a msg se a qstao ja existir
   
  else {

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


//------------------ Calendario-------------------------------------
exports.cadastroEvento   = function(request, response, next){
  console.log("cadastroEvento inicio ");

  //var matricula= request.body.matricula;
  var evento   = request.body.title;
  var data     = request.body.startsAt;
  var cor      = request.body.corPrimary;
  var cor2     = request.body.corSecondary;

  var inserEvento = "INSERT INTO `calendario`(`matricula`, `evento`, `datahora`, `cor`, `cor2`) VALUES ('"+req.user.matricula+"','"+evento+"','"+data+"','"+cor+"','"+cor2+"')";
  
  connDB.query(inserEvento,function(err,rows){ if (err) request.flash('MSGCadEvento', err);});          

  console.log(" cadastroEvento fim ");

  return   response.render('paginas/index', {message: request.flash('MSGCadQuest','Dados Gravados Com sucesso'), user: request.user.username});

};
  
  





