-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tempo de Geração: 
-- Versão do Servidor: 5.5.27
-- Versão do PHP: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de Dados: `sge`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `aluno`
--

CREATE TABLE IF NOT EXISTS `aluno` (
  `matricula` varchar(5) NOT NULL,
  `nome` varchar(60) NOT NULL,
  `data_nasc` date NOT NULL,
  `email` varchar(30) NOT NULL,
  `data_mod` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `aluno`
--

INSERT INTO `aluno` (`matricula`, `nome`, `data_nasc`, `email`, `data_mod`) VALUES
('01671', 'Leo', '0000-00-00', 'leonanci99@gmail.com', '2016-10-06 21:43:30'),
('11223', 'Yuri', '1998-08-12', 'yurimedeiros33@gmail.com', '2016-10-06 21:42:00'),
('12345', 'Seiya', '1973-12-01', 'seiya_pegasus@cdzmail.com', '0000-00-00 00:00:00'),
('12346', 'Shiryu', '1970-10-04', 'shiryu_dragao@cdzmail.com', '2016-10-06 22:21:35'),
('12347', 'Shun', '1973-02-23', 'shun_andromeda@cdzmail.com', '2016-10-06 22:21:20'),
('12348', 'Hyoga', '1971-11-12', 'hyoga_cisne@cdzmail.com', '2016-10-06 22:23:07'),
('12349', 'Ikki', '1970-07-06', 'ikki_fenix@cdzmail.com', '2016-10-06 22:24:05'),
('24043', 'Matheus', '1998-11-25', 'matheus.pegasus25@hotmail.com', '2016-10-06 21:42:15'),
('98712', 'Renan', '1657-03-12', 'fatlani@gmail.com', '2016-10-06 21:44:31');

-- --------------------------------------------------------

--
-- Estrutura da tabela `aluno_nota`
--

CREATE TABLE IF NOT EXISTS `aluno_nota` (
  `matricula` varchar(5) NOT NULL,
  `disciplina_id` int(5) NOT NULL,
  `nota` int(11) NOT NULL,
  `ano_letivo` date NOT NULL,
  `data_mod` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='INCOMPLETO';

-- --------------------------------------------------------

--
-- Estrutura da tabela `disciplinas`
--

CREATE TABLE IF NOT EXISTS `disciplinas` (
  `disciplina_id` int(5) NOT NULL,
  `disciplina_nome` varchar(16) NOT NULL,
  `anoserie` varchar(5) NOT NULL,
  PRIMARY KEY (`disciplina_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `disciplinas`
--

INSERT INTO `disciplinas` (`disciplina_id`, `disciplina_nome`, `anoserie`) VALUES
(1, 'Português', ''),
(2, 'Literatura', ''),
(3, 'Matemática I', ''),
(4, 'Matemática II', ''),
(5, 'Química I', ''),
(6, 'Química II', ''),
(7, 'Sociologia', ''),
(8, 'Geografia', ''),
(9, 'Biologia', ''),
(10, 'Artes', ''),
(11, 'Música', ''),
(12, 'Fisíca', ''),
(13, 'História', ''),
(14, 'LPI', ''),
(15, 'LPII', ''),
(16, 'LPIII', ''),
(17, 'LPIV', ''),
(18, 'Eng. Software', ''),
(19, 'Filosofia', ''),
(20, 'Inglês', ''),
(21, 'Ed. Física', ''),
(22, 'Espanhol', ''),
(23, 'Francês', ''),
(24, 'Desenho Avançado', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `materia`
--

CREATE TABLE IF NOT EXISTS `materia` (
  `materia_id` int(5) NOT NULL,
  `nome` text NOT NULL,
  `descricao` text NOT NULL,
  `disciplina_id` varchar(5) NOT NULL,
  PRIMARY KEY (`materia_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `materia`
--

INSERT INTO `materia` (`materia_id`, `nome`, `descricao`, `disciplina_id`) VALUES
(1, 'Modernismo', 'Movimento Literário no Brasil', '2'),
(2, 'Matrizes', 'Cálculos em um conjunto retangular de números, símbolos ou expressões, organizados em linhas e colunas', '3'),
(3, 'Eletromagnetismo', 'Conjunto de fenômenos que dizem respeito à interação entre campos elétricos e magnéticos e sua inter-relação', '12'),
(4, 'Relevo', 'Estudo das diferentes formas que moldam a superfície terrestre', '8'),
(5, 'Relevo', 'Estudo das diferentes formas que moldam a superfície terrestre', '8');

-- --------------------------------------------------------

--
-- Estrutura da tabela `professor_disciplinas`
--

CREATE TABLE IF NOT EXISTS `professor_disciplinas` (
  `matricula` varchar(10) NOT NULL,
  `disciplina_id` varchar(5) NOT NULL,
  `ano_letivo` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `professor_disciplinas`
--

INSERT INTO `professor_disciplinas` (`matricula`, `disciplina_id`, `ano_letivo`) VALUES
('1', '2', 2016);

-- --------------------------------------------------------

--
-- Estrutura da tabela `profs`
--

CREATE TABLE IF NOT EXISTS `profs` (
  `matricula` varchar(10) NOT NULL,
  `nome` tinytext NOT NULL,
  `data_nasc` date NOT NULL,
  `cpf` tinyint(11) NOT NULL,
  `telefone_celular` varchar(15) NOT NULL,
  `email` varchar(30) NOT NULL,
  `data_mod` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `profs`
--

INSERT INTO `profs` (`matricula`, `nome`, `data_nasc`, `cpf`, `telefone_celular`, `email`, `data_mod`) VALUES
('1', 'Jacinto ', '1946-09-06', 1, '1', 'jacintao@gmail.com', '2016-09-22 04:31:13');

-- --------------------------------------------------------

--
-- Estrutura da tabela `prof_diario`
--

CREATE TABLE IF NOT EXISTS `prof_diario` (
  `cod_aula` varchar(10) NOT NULL,
  `matricula` varchar(10) NOT NULL,
  `turma` varchar(5) NOT NULL,
  `data` date NOT NULL,
  `disciplina_id` varchar(5) NOT NULL,
  `comentario` int(11) NOT NULL,
  `data_mod` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cod_aula`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `prof_diario_aluno`
--

CREATE TABLE IF NOT EXISTS `prof_diario_aluno` (
  `cod_aula` varchar(10) NOT NULL,
  `matricula` varchar(5) NOT NULL,
  `presente` varchar(3) NOT NULL,
  `data_mod` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `prof_turma`
--

CREATE TABLE IF NOT EXISTS `prof_turma` (
  `matricula` varchar(10) NOT NULL,
  `cod_turma` varchar(5) NOT NULL,
  `ano_letivo` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `prof_turma`
--

INSERT INTO `prof_turma` (`matricula`, `cod_turma`, `ano_letivo`) VALUES
('1', 'IN313', 2016);

-- --------------------------------------------------------

--
-- Estrutura da tabela `provas`
--

CREATE TABLE IF NOT EXISTS `provas` (
  `cod_prova` int(12) NOT NULL AUTO_INCREMENT,
  `matricula` varchar(10) NOT NULL,
  `cod_disciplina` varchar(5) NOT NULL,
  `anoserie` varchar(5) NOT NULL,
  `tipo_avaliacao` varchar(20) NOT NULL,
  `data_mod` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cod_prova`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Extraindo dados da tabela `provas`
--

INSERT INTO `provas` (`cod_prova`, `matricula`, `cod_disciplina`, `anoserie`, `tipo_avaliacao`, `data_mod`) VALUES
(1, '1', '2', '3º an', 'Prova', '2016-10-13 05:29:18');

-- --------------------------------------------------------

--
-- Estrutura da tabela `prova_questoes`
--

CREATE TABLE IF NOT EXISTS `prova_questoes` (
  `cod_prova` varchar(5) NOT NULL,
  `cod_quest` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `questoes`
--

CREATE TABLE IF NOT EXISTS `questoes` (
  `cod_quest` int(12) NOT NULL AUTO_INCREMENT COMMENT 'codigo associado a questao ( cahave primaria)',
  `autor` varchar(50) NOT NULL COMMENT 'autor da questao; ou cod_prof ou enem,uff etc ',
  `nivel` char(20) NOT NULL COMMENT 'a dificuldade da questao: b>baixo,m>medio,a>alto',
  `tipo` char(20) NOT NULL COMMENT 'd>discursiva e o>objetivas',
  `disciplina_id` varchar(5) NOT NULL,
  `materia_id` varchar(5) NOT NULL,
  `enunciado` text NOT NULL,
  `op1` text NOT NULL,
  `op2` text NOT NULL,
  `op3` text NOT NULL,
  `op4` text NOT NULL,
  `op5` text NOT NULL,
  `gabarito` text NOT NULL,
  `ano_letivo` varchar(4) NOT NULL,
  `anoserie` varchar(20) NOT NULL,
  `visibilidade` varchar(3) NOT NULL COMMENT 'pub:publico ou pri:privado(disponivel somente para o prof criador da questao)',
  `data_mod` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cod_quest`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Extraindo dados da tabela `questoes`
--

INSERT INTO `questoes` (`cod_quest`, `autor`, `nivel`, `tipo`, `disciplina_id`, `materia_id`, `enunciado`, `op1`, `op2`, `op3`, `op4`, `op5`, `gabarito`, `ano_letivo`, `anoserie`, `visibilidade`, `data_mod`) VALUES
(4, 'Jacinto', 'Mediana', 'Discursiva', '2', '1', 'EU NÃO AGUENTO MAIS ERROS4', '', '', '', '', '', 'asdjsauhdsakjdh', '2016', '3º ano', 'Púb', '2016-10-13 04:10:49'),
(5, 'Jacinto', 'Mediana', 'Discursiva', '2', '1', 'EU NÃO AGUENTO MAIS ERROS5', '', '', '', '', '', 'asdjsauhdsakjdh', '2016', '3º ano', 'Púb', '2016-10-13 04:10:51'),
(7, 'Jacinto', 'Mediana', 'Discursiva', '2', '1', 'Portugues é uma droga?', '', '', '', '', '', 'sim', '2016', '3º ano', 'Púb', '2016-10-13 04:49:45'),
(8, 'Jacinto', 'Mediana', 'Discursiva', '2', '1', '1212', '', '', '', '', '', 'asdasd', '2016', '1º ano', 'Pri', '2016-10-14 17:15:07');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipo_prova`
--

CREATE TABLE IF NOT EXISTS `tipo_prova` (
  `tipo_avaliacao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tipo_prova`
--

INSERT INTO `tipo_prova` (`tipo_avaliacao`) VALUES
('1° certificação '),
('1° certificação recuperação '),
('2° certificação '),
('2° certificação recuperação '),
('3° certificação '),
('3° certificação recuperação ');

-- --------------------------------------------------------

--
-- Estrutura da tabela `turma`
--

CREATE TABLE IF NOT EXISTS `turma` (
  `cod_turma` varchar(5) NOT NULL,
  `anoserie` varchar(6) NOT NULL,
  `sala` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `turma`
--

INSERT INTO `turma` (`cod_turma`, `anoserie`, `sala`) VALUES
('IN313', '3º', '12-B'),
('MA313', '3º', '13-B');

-- --------------------------------------------------------

--
-- Estrutura da tabela `turma_aluno`
--

CREATE TABLE IF NOT EXISTS `turma_aluno` (
  `cod_turma` varchar(5) NOT NULL,
  `matricula` varchar(5) NOT NULL,
  `ano_letovo` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `turma_aluno`
--

INSERT INTO `turma_aluno` (`cod_turma`, `matricula`, `ano_letovo`) VALUES
('IN313', '24043', '2016-01-01'),
('IN313', '11223', '2016-01-01'),
('IN313', '01673', '2016-01-01'),
('IN313', '98712', '2016-01-01'),
('IN313', '12345', '0000-00-00'),
('IN313', '12346', '0000-00-00'),
('IN313', '12347', '0000-00-00'),
('IN313', '12348', '0000-00-00'),
('IN313', '12349', '0000-00-00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `matricula` varchar(10) NOT NULL,
  `username` tinytext NOT NULL,
  `senha` tinytext NOT NULL,
  `permissao` varchar(10) NOT NULL,
  `data_mod` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`matricula`, `username`, `senha`, `permissao`, `data_mod`) VALUES
('1', 'Jacinto ', '1', 'Professor', '2016-09-22 04:31:13');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
