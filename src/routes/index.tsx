import { BrowserRouter } from "react-router"

import { Loading } from "../components/Loading"

// Importando os dados do contexto
import { useAuth } from "../hooks/useAuth"

import { AuthRoutes } from "./AuthRoutes"
import { ManagerRoutes } from "./ManagerRoutes"
import { EmployeeRoutes } from "./EmployeeRoutes"

// const session = undefined;

export function Routes() {
    // Usando os dados do contexto
    const { session, isLoading } = useAuth();

    function Route() {
        switch (session?.user.role) {
            case "employee":
                return <EmployeeRoutes />
            
            case "manager":
                return <ManagerRoutes />

            default:
                return <AuthRoutes />
        }
    }

    if(isLoading) {
        return <Loading />
    }

    return (
        <BrowserRouter>
            {/* Rederizamos o método Route criado que retorna o componente por perfil de usuário passado */}
            <Route />
        </BrowserRouter>
    )
}