import { use /* useContext */ } from "react" // Importamos o useContext que tbm pode ser chamado de use que permite acessar o contexto

// Contecto criado no App para ser acessado por toda aplicação
import { AuthContext } from "../contexts/AuthContext"

export function useAuth() {
    // Repassando o contexto
    const context = use(AuthContext);

    // Retornando o contexto para utilização global, bastando importar o authContext
    return context;
}