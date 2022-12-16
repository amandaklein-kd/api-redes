from fastapi import FastAPI
import psycopg2
import model
import base64 

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

conexao = psycopg2.connect(
    host="localhost",
    database="studygroup",
    user="postgres",
    password="lulu")

def ret(query):
        try:
            conn = psycopg2.connect(
    host="localhost",
    database="studygroup",
    user="postgres",
    password="lulu")
        except Exception as e:
            raise e

        try:
            cur = conn.cursor()
            cur.execute(query)
            return cur.fetchall()
        except Exception as e:
            conn.rollback()
            print(e)
            return e
        finally:
            cur.close()
            conn.close()
            
def retById(query, values = None):
        try:
            conn = psycopg2.connect(
    host="localhost",
    database="studygroup",
    user="postgres",
    password="lulu")
        except Exception as e:
            raise e

        try:
            cur = conn.cursor()
            cur.execute(query, (values))
            return cur.fetchall()
        except Exception as e:
            conn.rollback()
            print(e)
            return e
        finally:
            cur.close()
            conn.close()
            
def alter(query, values):
        try:
            conn = psycopg2.connect(
    host="localhost",
    database="studygroup",
    user="postgres",
    password="lulu")
        except Exception as e:
            print(e)
            raise e

        try:
            cur = conn.cursor()
            cur.execute(query, values)
            conn.commit()
            return "Sucesso"
        except Exception as e:
            conn.rollback()
            print(e)
            return e
        finally:
            cur.close()
            conn.close()

#CRUD das tabelas

#Lugar
@app.get("/lugar")
def retornaLugar():
    
    
    retorno = ret("SELECT s.id_lugar, s.bloco, s.predio, s.sala FROM lugar as s")

    result = []
    for id, bloco, predio, sala in retorno:
        result.append(model.Lugar(id, bloco, predio, sala))
    
    return result

@app.get("/lugarid&id={id}")
def retornaLugarPorId(id):
    
    retorno = retById("SELECT s.id_lugar, s.bloco, s.predio, s.sala FROM lugar as s WHERE s.id_lugar = %s", (id,))

    result = []
    for id, gbloco, predio, sala in retorno:
        result.append(model.Lugar(id, gbloco, predio, sala))
    
    return result

@app.post("/criarlugar&bloco={bloco}&predio={predio}&sala={sala}")
def retornaLugarPorId(bloco, predio, sala):
    
    retorno = alter("INSERT INTO lugar (bloco, predio, sala) VALUES (%s, %s, %s)", (bloco, predio, sala))

    if(retorno == 'Sucesso'):
        result = 1
    else:
        result = 0
    
    return result

@app.delete("/deletalugar&id_lugar={id}")
def retornaLugarPorId(id):
    
    retorno = alter("DELETE FROM lugar WHERE id_lugar = %s", (id,))

    if(retorno == 'Sucesso'):
        result = 1
    else:
        result = 0
    
    return result

@app.put("/atualizalugar&id_lugar={id_lugar}&campos={campos}&valores={valores}")
def atualizaLugarPorIdBloco(id_lugar, campos, valores):
    
    print(tuple(campos.split(",")))
    campos = tuple(campos.split(","))
    valores = tuple(valores.split(","))
    
    stratt = ""
    for i in range(len(campos)):
        if(stratt != ""):
            stratt += ", " + campos[i] + " = %s"
        else:
            stratt += campos[i] + " = %s"
            
    valores += (id_lugar,)
    print(stratt)
    
    retorno = alter("UPDATE lugar SET "+ stratt + " WHERE id_lugar = %s", valores)

    if(retorno == 'Sucesso'):
        result = 1
    else:
        result = 0
    
    return result


#Grupo
@app.get("/grupo")
def retornaGrupo():
    
    retorno = ret("SELECT s.id, s.disciplina, s.materias, s.num_participantes, s.usuario_criador FROM grupo as s")

    result = []
    for id, disc, mat, num, user in retorno:
        result.append(model.Grupo(id, disc, mat, num, user))
    
    return result

@app.get("/grupoid&id={id}")
def retornaLugarPorId(id):
    
    retorno = retById("SELECT s.id, s.disciplina, s.materias, s.num_participantes, s.usuario_criador FROM grupo as s WHERE s.id = %s", (id,))

    result = []
    for id, disc, mat, num, user in retorno:
        result.append(model.Grupo(id, disc, mat, num, user))
    
    return result

@app.post("/criargrupo&disciplina={disciplina}&materias={materias}&usuario_criador={user}")
def retornaGrupoPorId(disciplina, materias, user):
    
    retorno = alter("INSERT INTO grupo (disciplina, materias, usuario_criador) VALUES (%s, %s, %s)", (disciplina, materias, user))

    if(retorno == 'Sucesso'):
        result = 1
    else:
        result = 0
    
    return result

@app.delete("/deletagrupo&id={id}")
def deletaGrupo(id):
    
    retorno = alter("DELETE FROM grupo WHERE id = %s", (id,))

    if(retorno == 'Sucesso'):
        result = 1
    else:
        result = 0
    
    return result

@app.put("/atualizagrupo&id={id}&campos={campos}&valores={valores}")
def atualizaGrupoPorId(id, campos, valores):
    
    print(tuple(campos.split(",")))
    campos = tuple(campos.split(","))
    valores = tuple(valores.split(","))
    
    stratt = ""
    for i in range(len(campos)):
        if(stratt != ""):
            stratt += ", " + campos[i] + " = %s"
        else:
            stratt += campos[i] + " = %s"
            
    valores += (id,)
    print(stratt)
    
    retorno = alter("UPDATE grupo SET "+ stratt + " WHERE id = %s", valores)

    if(retorno == 'Sucesso'):
        result = 1
    else:
        result = 0
    
    return result


#Ocorre
@app.get("/ocorre")
def retornaOcorre():
    
    
    retorno = ret("SELECT s.id, s.id_grupo, s.horario, s.data, s.cod_lugar FROM ocorre as s")

    result = []
    for id, id_grupo, horario, data, cod_lugar in retorno:
        result.append(model.Ocorre(id, id_grupo, horario, data, cod_lugar))
    
    return result

#Retorna a lista de grupos com datas e lugares, pelo id do grupo.
@app.get("/ocorreidgrupo&id={id}")
def retornaOcorrePorIdGrupo(id):
    
    retorno = retById("SELECT s.id, s.id_grupo, s.horario, s.data, s.cod_lugar FROM ocorre as s WHERE s.id_grupo = %s", (id,))

    result = []
    for id, id_grupo, horario, data, cod_lugar in retorno:
        result.append(model.Ocorre(id, id_grupo, horario, data, cod_lugar))
    
    return result

@app.post("/criarocorre&id_grupo={grupo}&horario={horario}&data={data}&cod_lugar={lugar}")
def criarOcorre(grupo, horario, data, lugar):
    
    retorno = alter("INSERT INTO ocorre (id_grupo, horario, data, cod_lugar) VALUES (%s, %s, %s, %s)", (grupo, horario, data, lugar))

    if(retorno == 'Sucesso'):
        result = 1
    else:
        result = 0
    
    return result

@app.delete("/deletaocorre&id={id}")
def deletaOcorrePorId(id):
    
    retorno = alter("DELETE FROM ocorre WHERE id = %s", (id,))

    if(retorno == 'Sucesso'):
        result = 1
    else:
        result = 0
    
    return result

@app.put("/atualizaocorre&id_grupo={id}&campos={campos}&valores={valores}")
def atualizaOcorrePorIDGrupo(id, campos, valores):
    
    print(tuple(campos.split(",")))
    campos = tuple(campos.split(","))
    valores = tuple(valores.split(","))
    
    stratt = ""
    for i in range(len(campos)):
        if(stratt != ""):
            stratt += ", " + campos[i] + " = %s"
        else:
            stratt += campos[i] + " = %s"
            
    valores += (id,)
    print(stratt)
    
    retorno = alter("UPDATE ocorre SET "+ stratt + " WHERE id_grupo = %s", valores)

    if(retorno == 'Sucesso'):
        result = 1
    else:
        result = 0
    
    return result


#Participa
@app.get("/participa")
def retornaParticipa():
    
    
    retorno = ret("SELECT s.id_grupo, s.id_aluno FROM participa as s")

    result = []
    for idg, ida in retorno:
        result.append(model.Participa(idg, ida))
    
    return result

@app.get("/participaidgrupo&id={id}")
def retornaParticipaPorIdGrupo(id):
    
    retorno = retById("SELECT s.id_grupo, s.id_aluno FROM participa as s WHERE s.id_grupo = %s", (id,))

    result = []
    for idg, ida in retorno:
        result.append(model.Participa(idg, ida))
    
    return result

@app.get("/participaidusuario&id={id}")
def retornaParticipaPorIdUsuario(id):
    
    retorno = retById("SELECT s.id_grupo, s.id_aluno FROM participa as s WHERE s.id_aluno = %s", (id,))

    result = []
    for idg, ida in retorno:
        result.append(model.Participa(idg, ida))
    
    return result

@app.post("/criarparticipa&id_grupo={idg}&id_aluno={ida}")
def criaParticipacao(idg, ida):
    
    retorno = alter("INSERT INTO participa (id_grupo, id_aluno) VALUES (%s, %s)", (idg, ida))

    if(retorno == 'Sucesso'):
        result = 1
    else:
        result = 0
    
    return result

@app.delete("/deletaparticipa&id_aluno={id}")
def deletaParticipacao(id):
    
    retorno = alter("DELETE FROM participa WHERE id_aluno = %s", (id,))

    if(retorno == 'Sucesso'):
        result = 1
    else:
        result = 0
    
    return result

@app.put("/atualizaparticipa&id_grupo={idg}&id_aluno={ida}&campos={campos}&valores={valores}")
def atualizaParticipacao(idg, ida, campos, valores):
    
    print(tuple(campos.split(",")))
    campos = tuple(campos.split(","))
    valores = tuple(valores.split(","))
    
    stratt = ""
    for i in range(len(campos)):
        if(stratt != ""):
            stratt += ", " + campos[i] + " = %s"
        else:
            stratt += campos[i] + " = %s"
            
    valores += (idg, ida)
    print(stratt)
    
    retorno = alter("UPDATE participa SET "+ stratt + " WHERE id_grupo = %s AND id_aluno = %s", valores)

    if(retorno == 'Sucesso'):
        result = 1
    else:
        result = 0
    
    return result


#Usuario
@app.get("/usuario")
def retornaUsuario():
    
    
    retorno = ret("SELECT s.id, s.nome, s.email, s.senha, s.matricula, s.periodo, s.curso, s.foto FROM usuario as s")
    print(retorno)
    result = []
    for id, nome, email, senha, mat, periodo, curso, foto in retorno:
        result.append(model.Usuario(id, nome, email, senha, mat, periodo, curso, str(bytes(foto))))
        
    
    return result

@app.get("/usuarioid&id={id}")
def retornaUsuarioPorId(id):
    
    retorno = retById("SELECT s.id, s.nome, s.email, s.senha, s.matricula, s.periodo, s.curso, s.foto FROM usuario as s WHERE s.id = %s", (id,))

    result = []
    for id, nome, email, senha, mat, periodo, curso, foto in retorno:
        result.append(model.Usuario(id, nome, email, senha, mat, periodo, curso, str(bytes(foto))))
    
    return result

@app.get("/usuarioemail&email={email}")
def retornaUsuarioPorEmail(email):
    
    retorno = retById("SELECT s.id, s.nome, s.email, s.senha, s.matricula, s.periodo, s.curso, s.foto FROM usuario as s WHERE s.email = %s", (email,))

    result = []
    for id, nome, email, senha, mat, periodo, curso, foto in retorno:
        result.append(model.Usuario(id, nome, email, senha, mat, periodo, curso, str(bytes(foto))))
    
    return result

@app.post("/criarusuario&nome={nome}&email={email}&senha={senha}&matricula={matricula}&periodo={periodo}&curso={curso}&foto={foto}")
def criarUsuario(nome, email, senha, matricula, periodo, curso, foto = None):
    
    retorno = alter("INSERT INTO usuario (nome, email, senha, matricula, periodo, curso, foto) VALUES (%s, %s, %s, %s, %s, %s, %s)", (nome, email, senha, matricula, periodo, curso, foto))

    if(retorno == 'Sucesso'):
        result = 1
    else:
        result = 0
    
    return result

@app.delete("/deletausuario&id={id}")
def deletaUsuario(id):
    
    retorno = alter("DELETE FROM usuario WHERE id = %s", (id,))

    if(retorno == 'Sucesso'):
        result = 1
    else:
        result = 0
    
    return result

@app.put("/atualizausuario&id={id}&campos={campos}&valores={valores}")
def atualizaUsuarioPorId(id, campos, valores):
    
    print(tuple(campos.split(",")))
    campos = tuple(campos.split(","))
    valores = tuple(valores.split(","))
    
    stratt = ""
    for i in range(len(campos)):
        if(stratt != ""):
            stratt += ", " + campos[i] + " = %s"
        else:
            stratt += campos[i] + " = %s"
            
    valores += (id,)
    print(stratt)
    
    retorno = alter("UPDATE usuario SET "+ stratt + " WHERE id = %s", valores)

    if(retorno == 'Sucesso'):
        result = 1
    else:
        result = 0
    
    return result


#Login
@app.get("/login&email={email}&senha={senha}")
def loginUsuario(email, senha):
    
    retorno = retById("SELECT s.id FROM usuario as s WHERE s.email = %s AND s.senha = %s", (email, senha))

    result = 0
    if(len(retorno) > 0):
        result = 1
    else:
        result = 0
            
    return result

