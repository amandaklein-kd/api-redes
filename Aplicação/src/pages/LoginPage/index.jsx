import React, { useState, useContext } from "react";
import {login} from '../../services/api'
import { AuthContext } from "../../contexts/auth";
import "./styles.css";
import UnifeiImg from '../../assets/unifei.svg'
import {useNavigate} from 'react-router-dom'
import {ReactSession} from 'react-client-session'


const LoginPage = () => {

    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit", {email, password });
        const response = await login(email, password);
        console.log(response)
        if(response.data==1){
          ReactSession.set('email',email)
          ReactSession.set('password',password)
          //ReactSession.set('id',response.data.id)
          navigate("/")
        }

    };


    return(
<div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={handleSubmit}>
            <span className="login-form-title"> Bem vindo </span>

            <span className="login-form-title">
              <img src={UnifeiImg} alt="Unifei Study Groups" />
            </span>

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

            <div className="container-login-form-btn">
              <button className="login-form-btn">Login</button>
            </div>

            <div className="text-center">
              <span className="txt1">Não possui conta? </span>
              <a className="txt2" href="/cadastro">
                Criar conta
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>





    );


};

export default LoginPage;