-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 14-Maio-2024 às 16:29
-- Versão do servidor: 8.0.31
-- versão do PHP: 8.1.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ssabadb`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cidade`
--

DROP TABLE IF EXISTS `cidade`;
CREATE TABLE IF NOT EXISTS `cidade` (
  `cid_id` int NOT NULL AUTO_INCREMENT,
  `cid_nome` varchar(255) DEFAULT NULL,
  `est_id` int DEFAULT NULL,
  PRIMARY KEY (`cid_id`),
  UNIQUE KEY `cid_nome` (`cid_nome`),
  KEY `cid_est_id` (`est_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `cidade`
--

INSERT INTO `cidade` (`cid_id`, `cid_nome`, `est_id`) VALUES
(1, 'Abadia de Goiás', 9);

-- --------------------------------------------------------

--
-- Estrutura da tabela `compra`
--

DROP TABLE IF EXISTS `compra`;
CREATE TABLE IF NOT EXISTS `compra` (
  `com_id` int NOT NULL AUTO_INCREMENT,
  `com_data_compra` date DEFAULT NULL,
  `com_data_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `com_valor_total` decimal(10,2) DEFAULT NULL,
  `pes_id` int DEFAULT NULL,
  PRIMARY KEY (`com_id`),
  KEY `pes_id` (`pes_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `compra`
--

INSERT INTO `compra` (`com_id`, `com_data_compra`, `com_data_registro`, `com_valor_total`, `pes_id`) VALUES
(5, '2024-05-14', '2024-05-14 19:25:33', '88.20', 5);

-- --------------------------------------------------------

--
-- Estrutura da tabela `estado`
--

DROP TABLE IF EXISTS `estado`;
CREATE TABLE IF NOT EXISTS `estado` (
  `est_id` int NOT NULL AUTO_INCREMENT,
  `est_nome` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `est_uf` char(2) DEFAULT NULL,
  PRIMARY KEY (`est_id`),
  UNIQUE KEY `est_nome` (`est_nome`),
  UNIQUE KEY `est_uf` (`est_uf`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `estado`
--

INSERT INTO `estado` (`est_id`, `est_nome`, `est_uf`) VALUES
(1, 'Acre', 'AC'),
(2, 'Alagoas', 'AL'),
(3, 'Amazonas', 'AM'),
(4, 'Amapá', 'AP'),
(5, 'Bahia', 'BA'),
(6, 'Ceará', 'CE'),
(7, 'Distrito Federal', 'DF'),
(8, 'Espírito Santo', 'ES'),
(9, 'Goiás', 'GO'),
(10, 'Maranhão', 'MA'),
(11, 'Minas Gerais', 'MG'),
(12, 'Mato Grosso do Sul', 'MS'),
(13, 'Mato Grosso', 'MT'),
(14, 'Pará', 'PA'),
(15, 'Paraíba', 'PB'),
(16, 'Pernambuco', 'PE'),
(17, 'Piauí', 'PI'),
(18, 'Paraná', 'PR'),
(19, 'Rio de Janeiro', 'RJ'),
(20, 'Rio Grande do Norte', 'RN'),
(21, 'Rondônia', 'RO'),
(22, 'Roraima', 'RR'),
(23, 'Rio Grande do Sul', 'RS'),
(24, 'Santa Catarina', 'SC'),
(25, 'Sergipe', 'SE'),
(26, 'São Paulo', 'SP'),
(27, 'Tocantins', 'TO');

-- --------------------------------------------------------

--
-- Estrutura da tabela `fisica`
--

DROP TABLE IF EXISTS `fisica`;
CREATE TABLE IF NOT EXISTS `fisica` (
  `pes_id` int NOT NULL,
  `fis_cpf` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `fis_rg` varchar(9) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `sex_id` int DEFAULT NULL,
  `fis_data_nascimento` date DEFAULT NULL,
  PRIMARY KEY (`pes_id`),
  KEY `sex_id` (`sex_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `fisica`
--

INSERT INTO `fisica` (`pes_id`, `fis_cpf`, `fis_rg`, `sex_id`, `fis_data_nascimento`) VALUES
(5, '12312312312', '286233678', 1, '1999-05-20'),
(6, '12312312312', '286233678', 1, '1999-05-20');

-- --------------------------------------------------------

--
-- Estrutura da tabela `itens_compra`
--

DROP TABLE IF EXISTS `itens_compra`;
CREATE TABLE IF NOT EXISTS `itens_compra` (
  `pro_id` int NOT NULL,
  `com_id` int NOT NULL,
  `itens_com_quantidade` int DEFAULT NULL,
  `itens_com_valor` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`pro_id`,`com_id`),
  KEY `com_id` (`com_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `itens_compra`
--

INSERT INTO `itens_compra` (`pro_id`, `com_id`, `itens_com_quantidade`, `itens_com_valor`) VALUES
(1, 5, 8, '4.90'),
(2, 5, 5, '9.80');

-- --------------------------------------------------------

--
-- Estrutura da tabela `juridica`
--

DROP TABLE IF EXISTS `juridica`;
CREATE TABLE IF NOT EXISTS `juridica` (
  `pes_id` int NOT NULL,
  `jur_cnpj` varchar(14) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `jur_razao_social` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `jur_url_site` varchar(255) DEFAULT NULL,
  `jur_nome_fantasia` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pes_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `juridica`
--

INSERT INTO `juridica` (`pes_id`, `jur_cnpj`, `jur_razao_social`, `jur_url_site`, `jur_nome_fantasia`) VALUES
(8, '04947060000177', 'Empresa A', '', 'Empresa AA');

-- --------------------------------------------------------

--
-- Estrutura da tabela `pessoa`
--

DROP TABLE IF EXISTS `pessoa`;
CREATE TABLE IF NOT EXISTS `pessoa` (
  `pes_id` int NOT NULL AUTO_INCREMENT,
  `pes_nome` varchar(255) DEFAULT NULL,
  `pes_email` varchar(255) DEFAULT NULL,
  `pes_telefone` varchar(20) DEFAULT NULL,
  `pes_logradouro` varchar(255) DEFAULT NULL,
  `pes_complemento` varchar(255) DEFAULT NULL,
  `pes_numero` varchar(10) DEFAULT NULL,
  `pes_bairro` varchar(100) DEFAULT NULL,
  `cid_id` int DEFAULT NULL,
  `pes_status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`pes_id`),
  KEY `cid_id` (`cid_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `pessoa`
--

INSERT INTO `pessoa` (`pes_id`, `pes_nome`, `pes_email`, `pes_telefone`, `pes_logradouro`, `pes_complemento`, `pes_numero`, `pes_bairro`, `cid_id`, `pes_status`) VALUES
(5, 'Luis', 'luis@gmail.com', '18999998888', 'Rua 1', '', '15', 'Bairro 1', 1, 1),
(6, 'Luis', 'luis@gmail.com', '18999998888', 'Rua 1', '', '15', 'Bairro 1', 1, 1),
(8, 'Luis', 'luis@gmail.com', '18999998888', 'Rua 1', '', '15', 'Bairro 1', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

DROP TABLE IF EXISTS `produto`;
CREATE TABLE IF NOT EXISTS `produto` (
  `pro_id` int NOT NULL AUTO_INCREMENT,
  `pro_nome` varchar(255) NOT NULL,
  `pro_descricao` text,
  `pro_estoque_ong` int DEFAULT '0',
  `pro_estoque_doacoes` int DEFAULT '0',
  `tipo_pro_id` int DEFAULT NULL,
  PRIMARY KEY (`pro_id`),
  KEY `produto_ibfk_1` (`tipo_pro_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `produto`
--

INSERT INTO `produto` (`pro_id`, `pro_nome`, `pro_descricao`, `pro_estoque_ong`, `pro_estoque_doacoes`, `tipo_pro_id`) VALUES
(1, 'Produto 1', 'Descrição do produto 1', 8, 0, 1),
(2, 'Produto 2', 'Descrição do produto 2', 5, 0, 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `sexo`
--

DROP TABLE IF EXISTS `sexo`;
CREATE TABLE IF NOT EXISTS `sexo` (
  `sex_id` int NOT NULL AUTO_INCREMENT,
  `sex_descricao` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`sex_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `sexo`
--

INSERT INTO `sexo` (`sex_id`, `sex_descricao`) VALUES
(1, 'Masculino'),
(2, 'Feminino'),
(3, 'Outro');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipos_permissao`
--

DROP TABLE IF EXISTS `tipos_permissao`;
CREATE TABLE IF NOT EXISTS `tipos_permissao` (
  `tp_id` int NOT NULL AUTO_INCREMENT,
  `tp_descricao` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`tp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `tipos_permissao`
--

INSERT INTO `tipos_permissao` (`tp_id`, `tp_descricao`) VALUES
(1, 'Administração');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipo_produto`
--

DROP TABLE IF EXISTS `tipo_produto`;
CREATE TABLE IF NOT EXISTS `tipo_produto` (
  `tipo_pro_id` int NOT NULL AUTO_INCREMENT,
  `tipo_pro_nome` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`tipo_pro_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `tipo_produto`
--

INSERT INTO `tipo_produto` (`tipo_pro_id`, `tipo_pro_nome`) VALUES
(1, 'Tipo 1'),
(3, 'Tipo 2'),
(4, 'Tipo 3');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipo_status`
--

DROP TABLE IF EXISTS `tipo_status`;
CREATE TABLE IF NOT EXISTS `tipo_status` (
  `ts_id` int NOT NULL AUTO_INCREMENT,
  `ts_descricao` varchar(45) NOT NULL,
  PRIMARY KEY (`ts_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `tipo_status`
--

INSERT INTO `tipo_status` (`ts_id`, `ts_descricao`) VALUES
(1, 'Ativo'),
(2, 'Inativo');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `usu_id` int NOT NULL AUTO_INCREMENT,
  `usu_senha` char(60) NOT NULL,
  `pes_id` int DEFAULT NULL,
  `tp_id` int DEFAULT NULL,
  `ts_id` int DEFAULT NULL,
  `usu_foto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`usu_id`),
  KEY `pes_id` (`pes_id`),
  KEY `tp_id` (`tp_id`),
  KEY `ts_id` (`ts_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`usu_id`, `usu_senha`, `pes_id`, `tp_id`, `ts_id`, `usu_foto`) VALUES
(1, '$2a$10$Kw8G2.APPXjQblD.Koc/p.eK8tKw8npk9fmZLOQJXRHoZ/FgFaksG', 5, 1, 1, 'https://static.vecteezy.com/ti/vetor-gratis/p3/3715527-imagem-perfil-icone-masculino-icone-humano-ou-pessoa-sinal-e-simbolo-vetor.jpg');

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`pes_id`) REFERENCES `pessoa` (`pes_id`);

--
-- Limitadores para a tabela `itens_compra`
--
ALTER TABLE `itens_compra`
  ADD CONSTRAINT `itens_compra_ibfk_1` FOREIGN KEY (`pro_id`) REFERENCES `produto` (`pro_id`),
  ADD CONSTRAINT `itens_compra_ibfk_2` FOREIGN KEY (`com_id`) REFERENCES `compra` (`com_id`);

--
-- Limitadores para a tabela `produto`
--
ALTER TABLE `produto`
  ADD CONSTRAINT `produto_ibfk_1` FOREIGN KEY (`tipo_pro_id`) REFERENCES `tipo_produto` (`tipo_pro_id`);


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

DROP TABLE IF EXISTS `doacao`

CREATE TABLE IF NOT EXISTS `doacao` (
  `doa_id` INT AUTO_INCREMENT,
  `doa_data` DATETIME,
  `doa_dinheiro` DECIMAL(10, 2),
  `pes_id_doador` INT,
  PRIMARY KEY (`doa_id`),
  FOREIGN KEY (`pes_id_doador`) REFERENCES `pessoa`(`pes_id`)
);

DROP TABLE IF EXISTS `itens_doacao`

CREATE TABLE IF NOT EXISTS `itens_doacao` (
  `pro_id` INT,
  `doa_id` INT,
  `itens_doa_quantidade` INT,
  `itens_doa_especificacao` ENUM('ONG', 'DOACOES') NOT NULL,
  PRIMARY KEY (`pro_id`, `doa_id`, `itens_doa_especificacao`),
  FOREIGN KEY (`pro_id`) REFERENCES `produto`(`pro_id`),
  FOREIGN KEY (`doa_id`) REFERENCES `doacao`(`doa_id`)
);


COMMIT;