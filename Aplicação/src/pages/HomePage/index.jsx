import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import {ReactSession} from 'react-client-session'
import {getCadastro, getGrupos} from '../../services/api'



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

    useEffect(() => {

        async function fillpage(){
        const getEmail = ReactSession.get("email")
        const getPassword = ReactSession.get("password")
        const response = await getCadastro(getEmail)
        const [nome, matricula, periodo, curso, foto] = response.data
        setName(nome)
        setMatricula(matricula)
        setPeriodo(periodo)
        setCurso(curso)
        setFoto(foto)
        setEmail(getEmail)
        setPassword(getPassword)

        const responseGrupo = await getGrupos()
        setGrupos(responseGrupo.data)
        }

        fillpage()
    })

    



    return (
        <>
            <h1>HomePage</h1>
            <p>{String(authenticated)}</p>
            <button onClick={handleLogout}></button>
        
        </>
    )


};

export default HomePage;