import { BrowserRouter } from "react-router"

import { Loading } from "../components/Loading"

import { AuthRoutes } from "./AuthRoutes"
import { ManagerRoutes } from "./ManagerRoutes"
import { EmployeeRoutes } from "./EmployeeRoutes"

const isLoading = false;

// const session = undefined;

const session = {
    user: {
        role: "",
    },
}

export function Routes() {
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