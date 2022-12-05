import React, { useState, useContext } from "react";
import UnifeiImg from '../../assets/unifei.svg'
import {createUser} from '../../services/api';
import {useNavigate} from 'react-router-dom';

import { AuthContext } from "../../contexts/auth";

 const CadGrupoPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [matricula, setMatricula] = useState("");
    const [periodo, setPeriodo] = useState("");
    const [curso, setCurso] = useState("");
    const handleSubmit = async (e) => {
      e.preventDefault()
      const foto = 'aa'
      const response = await createUser(name,email,password,matricula,periodo,curso,foto)

      if(response.status == 200){
        navigate('/login');
      }

    }

    

    return(
        <div className="container">
        <div className="container-login">
          <div className="wrap-login">
            <form className="login-form" onSubmit={handleSubmit}>
              <span className="login-form-title"> Criar Conta </span>
  
              <span className="login-form-title">
                <img src={UnifeiImg} alt="Unifei Study Groups" />
              </span>

              <div className="wrap-input">
                <input
                  className={name !== "" ? "has-val input" : "input"}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Nome"></span>
              </div>
  
              <div className="wrap-input">
                <input
                  className={email !== "" ? "has-val input" : "input"}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Email"></span>
              </div>
  
              <div className="wrap-input">
                <input
                  className={password !== "" ? "has-val input" : "input"}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Password"></span>
              </div>

              <div className="wrap-input">
                <input
                  className={matricula !== "" ? "has-val input" : "input"}
                  type="text"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Número de Matrícula"></span>
              </div>

              <div className="wrap-input">
                <input
                  className={periodo !== "" ? "has-val input" : "input"}
                  type="text"
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Periodo"></span>
              </div>

              <div className="wrap-input">
                <input
                  className={curso !== "" ? "has-val input" : "input"}
                  type="text"
                  value={curso}
                  onChange={(e) => setCurso(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Curso"></span>
              </div>
  


              <div className="container-login-form-btn">
                <button className="login-form-btn">Cadastrar</button>
              </div>
  
              <div className="text-center">
                <span className="txt1">Já possui conta? </span>
                <a className="txt2" href="/login">
                  Acessar Conta
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>


    )
}

export default CadGrupoPage;
