class Lugar:
    def __init__(self, id, bloco, predio, sala):
        self.id = id
        self.bloco = bloco
        self.predio = predio
        self.sala = sala
        
class Usuario:
    def __init__(self, id, nome, email, senha, matricula, periodo, curso, foto):
        self.id = id
        self.nome = nome
        self.email = email
        self.senha = senha
        self.matricula = matricula
        self.periodo = periodo
        self.curso = curso
        self.foto = foto
        
class Grupo:
    def __init__(self, id, disciplina, materias, num_participantes, usuario_criador):
        self.id = id
        self.disciplina = disciplina
        self.materias = materias
        self.num_participantes = num_participantes
        self.usuario_criador = usuario_criador
        
class Ocorre:
    def __init__(self, id, id_grupo, horario, data, bloco, cod_sala):
        self.id = id
        self.id_grupo = id_grupo
        self.horario = horario
        self.data = data
        self.bloco = bloco
        self.cod_sala =  cod_sala
        
class Participa:
    def __init__(self, id_grupo, id_aluno):
        self.id_grupo = id_grupo
        self.id_aluno = id_aluno