import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import {ReactSession} from 'react-client-session'
import {getCadastro, getGrupos} from '../../services/api'
import './styles.css'
import UserImg from '../../assets/user.png'



const HomePage = () => {
    const { authenticated, logout } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [matricula, setMatricula] = useState("");
    const [periodo, setPeriodo] = useState("");
    const [curso, setCurso] = useState("");
    const [foto, setFoto] = useState("")
    const [grupos,setGrupos] = useState([])
    const handleLogout = () => {
        logout();
    };

    
    const itens = [

        {"Disciplina": "Redes",
        "Materia": "Camada de Enlace",
        "Numero de participantes": 6,
        "Usuario criador": "Marcelo",},
        
        {"Disciplina": "Computação Gráfica",
        "Materia": "Shaders",
        "Numero de participantes": 3,
        "Usuario criador": "Amanda",},
       
        {"Disciplina": "Banco de dados 2",
        "Materia": "MongoDb",
        "Numero de participantes": 7,
        "Usuario criador": "Jorge",},
       
        {"Disciplina": "Compiladores",
        "Materia": "Analisador Sintático",
        "Numero de participantes": 3,
        "Usuario criador": "Bruno",},
       
        {"Disciplina": "Inteligencia Artifical",
        "Materia": "Algoritmo A*",
        "Numero de participantes": 2,
        "Usuario criador": "Rui",}
    ]
    
    



    return (
        <div className="container">
      <div className="container-home">
        <div className="wrap-perfil">
          <img className="user-image"src={UserImg}/>
          <div className="user-data">
          <span>Nome: Marcelo Magalhaes Silva</span>
          <span>Email: magalhaessmarcelos@gmail.com</span>
          <span>Matricula: 2020004243</span>
          <span>Periodo 6</span>
          <span>Curso: CCO</span>
          </div>
        </div>
      </div>
      <div className="container-lista">
        <div className="wrap-lista">
        
            <span className="login-form-title"> Grupos </span>
            <a href="/cadastro-grupo" className="criar-grupo">Criar Grupo</a>
            <ul>
                {itens.map(function(element,i) {
                    return (<li key={i} className="list-item">
                    <div className="item-description">
                    <span>Disciplina: {element["Disciplina"]}</span>
                    <span>Materia: {element["Materia"]}</span>
                    <span>Numero de participantes: {element["Numero de participantes"]}</span>
                    <span>Usuario criador: {element["Usuario criador"]}</span>
                    </div>
                    <button className="botao-cadastrar">Cadastrar</button>
                </li>)
                })}
                
                
                
            </ul>
            
            
        </div>
      </div>
    </div>
    )


};

export default HomePage;