import React, { useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";




const PerfilPage = () => {

    const { authenticated, login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit", {email, password });
        login(email, password);

    };


    return(
<div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-form-title"> Bem vindo </span>

            
          </form>
        </div>
      </div>
    </div>





    );


};

export default PerfilPage;