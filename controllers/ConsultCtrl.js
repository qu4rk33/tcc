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


exports.pesquisateste   =   function(req, res){
  var x = 0; // Variável pra controlar o número de condições 0 = Nenhuma condição
  console.log(req.body.autor + req.body.nivel + req.body.tipo + req.body.disciplina + req.body.materia + req.body.creation + req.body.serie);
  //Cria a condição WHERE de autor
  if(req.body.autor == '' || req.body.autor == null || req.body.autor == undefined){

    var condicaoAutor = "";

  }
  else {
    var condicaoAutor = " autor= '" + req.body.autor + "'";
    x++;
  }

  //Cria a condição WHERE de nível
  if(req.body.nivel == '' || req.body.nivel == null || req.body.nivel == undefined || req.body.nivel == 'Nível'){
    var condicaoNivel = "";
  }
  else {
    //Testa se já tem alguma outra condição
    if(x>0) {var condicaoNivel = " AND";}
    else {var condicaoNivel = "";}
    condicaoNivel += " nivel= '" + req.body.nivel + "'";
    x++;
  }

  //Cria a condição WHERE de tipo
  if(req.body.tipo == '' || req.body.tipo == null || req.body.tipo == undefined || req.body.tipo == 'Tipo'){
    var condicaoTipo = "";
  }
  else {
    //Testa se já tem alguma outra condição
    if(x>0) {var condicaoTipo = " AND";}
    else {var condicaoTipo = "";}
    condicaoTipo += " tipo = '"+ req.body.tipo +"'";
    x++;
  }

  //Cria a condição WHERE de disciplina
  if(req.body.disciplina == '' || req.body.disciplina == null || req.body.disciplina == undefined || req.body.disciplina == 'Disciplina'){
    var condicaoDisciplina = "";
  }
  else {
    //Testa se já tem alguma outra condição
    if(x>0) {var condicaoDisciplina = " AND";}
    else {var condicaoDisciplina = "";}
    condicaoDisciplina += " disciplina_id = (SELECT `disciplina_id` FROM `disciplinas` WHERE disciplina_nome = '"+ req.body.disciplina +"')";
    x++;
  }

  //Cria a condição WHERE de matéria
  if(req.body.materia == '' || req.body.materia == null || req.body.materia == undefined || req.body.materia == 'Matéria'){
    var condicaoMateria = "";
  }
  else {
    //Testa se já tem alguma outra condição
    if(x>0) {var condicaoMateria = " AND";}
    else {var condicaoMateria = "";}
    condicaoMateria += " materia_id = (SELECT `materia_id` FROM `materia` WHERE nome = '"+ req.body.materia +"')";
    x++;
  }

  //Cria a condição WHERE de ano de criação
  if(req.body.creation == '' || req.body.creation == null || req.body.creation == undefined){
    var condicaoAno = "";
  }
  else {
    //Testa se já tem alguma outra condição
    if(x>0) {var condicaoAno = " AND";}
    else {var condicaoAno = "";}
    condicaoAno += " ano_letivo = '"+ req.body.creation +"'";
    x++;
  }

  //Cria a condição WHERE de série
  if(req.body.serie == '' || req.body.serie == null || req.body.serie == undefined || req.body.serie == 'Série'){
    var condicaoSerie = "";
  }
  else {
    //Testa se já tem alguma outra condição
    if(x>0) {var condicaoSerie = " AND";}
    else {var condicaoSerie = "";}
    condicaoSerie += " anoserie = '"+ req.body.serie +"'";
  }

  // Testa se tem alguma condição
  if(x>0){
    var whereClause = "WHERE";
  }
  else {
    var whereClause = "";
  }


  var questoes = [];
  var qry =  "SELECT questoes.enunciado, questoes.gabarito, questoes.cod_quest FROM questoes "+ whereClause + condicaoAutor + condicaoNivel + condicaoTipo + condicaoDisciplina + condicaoMateria + condicaoAno + condicaoSerie +" GROUP BY enunciado" ;
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
  connDB.query("select distinct cod_turma from prof_turma where matricula = '"+req.body.matricula+"'  ",function(err,rows){
    for (var i = 0, len = rows.length; i < len; i++)
      {

        consulTurmas.push(rows[i].cod_turma);
      }
      console.log(consulTurmas);
  res.json(consulTurmas);

  });
};

exports.pesquisaDiscProf = function(req, res){

  var consulDisc = [];  // AQUI FOI CRIADO UM ARRAY QUE VAI COMPORTAR OS RESULTADOS .
  connDB.query("select disciplina from prof_turma where matricula = '"+req.body.matricula+"' ",function(err,rows){
    for (var i = 0, len = rows.length; i < len; i++)
      {
       
        consulDisc.push( rows[i].disciplina );
      } 
      console.log(consulDisc);
  res.json(consulDisc);

  });
};

exports.pegaPresenca   =   function(req, res){

      var dadosTable = [];
      var data= req.body.txtSelectedDate;
      var datasplit = data.split("/");
      var dataFormatada = datasplit[2] +'-'+ datasplit[1] +'-'+ datasplit[0];

      
      var qry = "select nome, aluno.matricula, presente, comentario,prof_diario.cod_aula  FROM aluno, turma_aluno, prof_diario_aluno,prof_diario            where cod_turma = '"+req.body.nometurma+"'and prof_diario.matricula='"+req.user.matricula+"' and cod_turma=prof_diario.turma             AND aluno.matricula=turma_aluno.matricula and  aluno.matricula =  prof_diario_aluno.matricula            and  prof_diario.data = '"+ dataFormatada +"'      and prof_diario.turma='"+req.body.nometurma+"'       and prof_diario.matricula ='"+req.user.matricula+"'                            AND      prof_diario.turma='"+req.body.nometurma+"'      and prof_diario.cod_aula=prof_diario_aluno.cod_aula ORDER BY nome";
      
      console.log(qry);
     
       connDB.query(qry,function(err,rows){
         if (err)
         req.flash('MSGCadQuest', err);
         if (rows.length) {

                  for (var i = 0, len = rows.length; i < len; i++) {
                     dadosTable.push([rows[i].nome, rows[i].matricula, rows[i].presente,rows[i].comentario ]);
                  }
                     dadosTable.push([rows[0].comentario ]);

                  console.log(dadosTable);
                  res.json(dadosTable);
         }
       });
};


/*----------------- calendario ----------------------*/
exports.pesquisaEvento  = function(req, res){
  var eventos = [];  
  
  var qry = "SELECT `matricula`, `cod_evento`, `evento`, `datahora`, `cor`, `cor2` FROM `calendario` WHERE `matricula`='"+req.user.matricula+"'  ";

  connDB.query(qry,function(err,rows){

    for (var i = 0, len = rows.length; i < len; i++)
      {
        eventos.push({
          cod_evento : rows[i].cod_evento,
          matricula  : rows[i].matricula,
          title      : rows[i].evento, 
          startsAt   : rows[i].datahora, 
          color:{
            primary   :rows[i].cor,
            secondary : rows[i].cor2 
          } ,
          actions: "actions"

        });
      }
   
  res.json(eventos);
  
  console.log("\n\t Evento consultado e entregue \n");

  });
};

exports.consulProva = function(req, res){

  var listaalunos = [];  // AQUI FOI CRIADO UM ARRAY QUE VAI COMPORTAR OS RESULTADOS .
  var qry = "SELECT cod_prova, provas.tipo_avaliacao, provas.anoserie  FROM provas, profs,disciplinas WHERE disciplinas.disciplina_nome = '" + req.body.disciplina + "' AND disciplinas.disciplina_id= provas.cod_disciplina AND provas.anoserie = '" + req.body.serie + "'AND tipo_avaliacao = '" + req.body.tipo + "' AND provas.matricula IN (SELECT matricula FROM profs where nome = '" + req.body.autor + "' )";
     


  console.log(qry);
  connDB.query(qry,function(err,rows){
    for (var i = 0, len = rows.length; i < len; i++)
      {
        //console.log()
        //listaalunos.push(rows[i].nome);
        listaalunos.push([rows[i].cod_prova, rows[i].tipo_avaliacao, rows[i].anoserie]);

        //nunes, é aqui que deveria pegar os nomes ? sim, e jogar na array tbm. vejamos cod_turma nao é nome..... mt bem observado
            }
  res.json(listaalunos);
 console.log(listaalunos);

  });


};









//     var lines = process.stdout.getWindowSize()[1];
//      for(var i = 0; i < lines; i++) {
//          console.log('\r\n');
//          console.log('\r\n');
//          console.log('\r\n');
//
//      }
