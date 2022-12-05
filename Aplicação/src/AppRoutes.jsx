import React, { useContext } from "react";

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import CadastroPage from "./pages/CadastroPage"
import CadGrupoPage from "./pages/CadGrupoPage"
import PerfilPage from "./pages/PerfilPage"


import { AuthProvider, AuthContext } from "./contexts/auth";

const AppRoutes = () => {
    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);

        if(loading) {
            return <div className="loading">Carregando...</div>
        }

        // if (!authenticated) {
        //     return <Navigate to="/login" />
        // }

        return children;
    };
    return (
        <Router>
            <AuthProvider>
            <Routes>
                <Route exact path="/login"
                 element={<LoginPage />}>
                </Route>
                
                <Route exact path="/"
                 element={
                    <Private>
                        <HomePage /> 
                    </Private>
                }>
                </Route>

                <Route exact path="/cadastro"
                 element={<CadastroPage />}>
                </Route>

                <Route exact path="/cadastro-grupo"
                 element={<CadGrupoPage />}>
                </Route>

                <Route exact path="/perfil"
                 element={<PerfilPage />}>
                </Route>

            </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;