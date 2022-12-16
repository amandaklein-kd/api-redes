import React, { useState, useContext } from "react";
import UnifeiImg from '../../assets/unifei.svg'

import { AuthContext } from "../../contexts/auth";

 const CadGrupoPage = () => {

    
   
    
    const [curso, setCurso] = useState("");
    const [materia, setMateria] = useState("");
    const [sala, setSala] = useState("");
    const [horario, setHorario] = useState("");
    const [data, setData] = useState("");



    return(
        <div className="container">
        <div className="container-cadastro">
          <div className="wrap-login">
            <form className="login-form">
              <span className="login-form-title"> Cadastrar Grupo de Estudo </span>
  
              <span className="login-form-title">
                <img src={UnifeiImg} alt="Unifei Study Groups" />
              </span>

              <div className="wrap-input">
                <input
                  className={materia !== "" ? "has-val input" : "input"}
                  type="text"
                  value={materia}
                  onChange={(e) => setMateria(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Matéria"></span>
              </div>

              <div className="wrap-input">
                <input
                  className={sala !== "" ? "has-val input" : "input"}
                  type="text"
                  value={sala}
                  onChange={(e) => setSala(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Sala"></span>
              </div>

              <div className="wrap-input">
                <input
                  className={data !== "" ? "has-val input" : "input"}
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Data"></span>
              </div>

              <div className="wrap-input">
                <input
                  className={horario !== "" ? "has-val input" : "input"}
                  type="time"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Horário"></span>
              </div>

      
  


              <div className="container-login-form-btn">
                <button className="login-form-btn" onClick="/">Cadastrar</button>
              </div>
  
              
            </form>
          </div>
        </div>
      </div>


    )
}

export default CadGrupoPage;
