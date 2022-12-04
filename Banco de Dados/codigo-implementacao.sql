
CREATE TABLE lugar(
	id_lugar serial not null primary key,
	bloco varchar(3),
	predio text NOT NULL,
	sala varchar(5), -- Salas tem 5 letras, laboratórios 4
	unique(sala)
);

CREATE TABLE usuario(
	id SERIAL PRIMARY KEY,
	nome varchar(50) NOT NULL,
	email varchar(256) NOT NULL UNIQUE,
	senha char(8) NOT NULL,
	matricula char(10) NOT NULL UNIQUE,
	periodo smallint NOT NULL,
	curso varchar(50) NOT NULL,
	foto bytea
);

CREATE TABLE grupo (
	id SERIAL PRIMARY KEY,
	disciplina varchar(50) NOT NULL,
	materias text,
	num_participantes int NOT NULL DEFAULT 1,
	usuario_criador int NOT NULL,
	FOREIGN KEY (usuario_criador) REFERENCES usuario(id)
);

CREATE TABLE ocorre(
	id serial PRIMARY KEY,
	id_grupo int NOT NULL,
	horario time NOT NULL,
	data date NOT NULL,
	cod_lugar int NOT NULL,
	FOREIGN KEY(id_grupo) REFERENCES grupo(id) 
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY(cod_lugar) REFERENCES lugar(id_lugar) 
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	UNIQUE(id_grupo, horario, data)
);

CREATE TABLE participa(
	id_grupo int NOT NULL,
	id_aluno int NOT NULL,
	FOREIGN KEY(id_grupo) REFERENCES grupo(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY(id_aluno) REFERENCES usuario(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	PRIMARY KEY(id_grupo, id_aluno)
);

CREATE OR REPLACE FUNCTION altera_qnt_participantes () RETURNS
TRIGGER AS $$
BEGIN
	IF(tg_op = 'INSERT') THEN
		UPDATE grupo SET num_participantes = num_participantes+1 WHERE id = NEW.id_grupo;
	ELSEIF(tg_op = 'DELETE') THEN
		UPDATE grupo SET num_participantes = num_participantes-1 WHERE id = OLD.id_grupo;
	ELSEIF(tg_op = 'UPDATE') THEN
		UPDATE grupo SET num_participantes = num_participantes+1 WHERE id = NEW.id_grupo;
		UPDATE grupo SET num_participantes = num_participantes-1 WHERE id = OLD.id_grupo;
	END IF;
	RETURN NULL;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER tr_atualiza_participantes AFTER INSERT OR DELETE OR UPDATE 
ON participa FOR EACH ROW EXECUTE PROCEDURE altera_qnt_participantes();

---Testando 

-- Usuario
INSERT INTO usuario(nome, email, senha, matricula, periodo, curso, foto) VALUES ('Ana', 'ana@gmail.com', 'senha123', '2020010680', 6, 'CCO',  pg_read_binary_file('C:\Users\nanin\Desktop\user.png')::bytea);
INSERT INTO usuario(nome, email, senha, matricula, periodo, curso, foto) VALUES ('João', 'joao@gmail.com', 'senha123', '2020010681', 3, 'ECO',  pg_read_binary_file('C:\Users\nanin\Desktop\user.png')::bytea);

-- Lugares
INSERT INTO lugar(bloco, predio, sala) values( 'C1', 'Instituto de Matemática e Computação - IMC', 'C1106');
INSERT INTO lugar(bloco, predio, sala) values( 'B4', 'Instituto de Engenharia de Produção e Gestão - IEPG', 'B4205');

-- Grupos
INSERT INTO grupo(disciplina, materias, usuario_criador) 
VALUES('Fundamentos da Programação', '1.Conceitos preliminares, 2.Representação de dados, 3. Algoritmos: representação, técnicas e estruturas de elaboração', 2);
INSERT INTO grupo(disciplina, usuario_criador) VALUES('Estrutura de Dados', 3);

--Ocorre
INSERT INTO ocorre(id_grupo, horario, data, cod_lugar) VALUES(1, '15:45:00', '20/11/2022', 1);
INSERT INTO ocorre(id_grupo, horario, data, cod_lugar) VALUES(3, '15:45:00', '21/11/2022', 2);

-- Participa
INSERT INTO participa VALUES(3, 3);
INSERT INTO participa VALUES(3, 1);
INSERT INTO participa VALUES(1, 1);
INSERT INTO participa VALUES(1, 2);
INSERT INTO participa VALUES(1, 3);

-- Testando Trigger
SELECT id, num_participantes
FROM grupo;

UPDATE participa set id_grupo = 2 WHERE id_grupo = 1; 

SELECT id, num_participantes
FROM grupo

DELETE FROM participa WHERE id_grupo = 1 AND id_aluno = 1

SELECT id, num_participantes
FROM grupo