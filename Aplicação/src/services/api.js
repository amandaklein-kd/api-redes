import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:8000",
});

export const createSession = async (email, password) => {
    return api.post('/sessions', {email, password});
};

export const createUser = async (nome,email,password,matricula,periodo,curso,foto) => {
    return api.post('/criarusuario&nome='+nome+'&email='+email+'&senha='+password+'&matricula='+matricula+'&periodo='+periodo+'&curso='+curso+'&foto='+foto+'')
}

export const deleteuser = async(id)=>{
    return api.delete('/deletausuario&id='+id)
}

export const atualizausuario = async(id,campos,valores) => {
    return api.put('/atualizausuario&id='+id+'&campos='+campos+'&valores='+valores)
}

export const login = async(login,senha) => {
    return api.get('/login&email='+login+'&senha='+senha)
}

export const getCadastro = async(id) => {
    return api.get('/usuarioid&email='+id)
}

export const getGrupos = async() => {
    return api.get('/grupo')
}

export const getGrupo = async(id) => {
    return api.get('/grupo&id='+id)
}

export const criaGrupo = async(disciplina,materias,user) => {
    return api.post('/criargrupo&disciplina='+disciplina+'&materias='+materias+'&usuario_criador='+user)
}

export const deletagrupo = async(id) => {
    return api.delete('/deletagrupo&id='+id)
}

export const atualizagrupo = async(id,campos,valores) => {
    return api.put('/atualizagrupo&id='+id+'&campos='+campos+'&valores='+valores)
}

export const getocorre = async() =>{
    return api.get('/ocorre')
}

export const getocorreid = async(id) => {
    return api.get('/ocorreidgrupo&id='+id)
}

export const getLugar = async() => {
    return api.get('/lugar')
}

export const criaocorre = async(grupo,horario,data,lugar)=>{
    return api.post('/criarocorre&id_grupo='+grupo+'&horario='+horario+'&data='+data+'&cod_lugar='+lugar)
}

export const deletaocorre = async(id) => {
    return api.delete('deletaocorre&id='+id)
}

export const atualizaocorre = async(id,campos,valores) =>{
    return api.put('/atualizaocorre&id_grupo='+id+'&campos='+campos+'&valores='+valores)
}

export const getparticipa = async() => {
    return api.get('/participa')
} 

export const getparticipaidgrupo = async(id) => {
    return api.get('/participaidgrupo&id='+id)
}

export const getparticipaidusuario = async(id) => {
    return api.get('/participaidusuario&id='+id)
}

export const deletaparticipa = async(id) => {
    return api.delete('/deletaparticipa&id_aluno='+id)
}


export const atualizaparticipa = async(idg,ida,campos,valores) => {
    return api.put('/atualizaparticipa&id_grupo='+idg+'&id_aluno='+ida+'&campos='+campos+'&valores='+valores)
}

export const getusuario = async() => {
    return api.get('/usuario')
}



export const criaparticipa = async(idg,ida) => {
    return api.post('/criarparticipa&id_grupo='+idg+'id_aluno='+ida)
}

export const getLugarId = async(id) => {
    return api.get('lugarid&id='+id)
}

export const criaLugar = async(bloco,predio,sala) => {
    return api.post('/criarlugar&bloco='+bloco+'&predio='+predio+'&sala='+sala)
}

export const deletalugar = async(id) => {
    return api.delete('deletalugar&id_lugar='+id)
}

export const atualizalugar = async(id,campos,valores) => {
    return api.put("/atualizalugar&id_lugar="+id+"&campos="+campos+"&valores="+valores)
}