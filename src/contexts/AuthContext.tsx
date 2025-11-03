import { useEffect, useState } from "react";
import { createContext, type ReactNode } from "react";
import { api } from "../services/api";

type AuthContext = {
    isLoading: boolean
    session: null | UserAPIResponse,
    save: (data: UserAPIResponse) => void,
    remove: () => void
}

const LOCAL_STORAGE_KEY = "@refund";

export const AuthContext = createContext({} as AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<null | UserAPIResponse>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Função que guarda os dados da session
    function save(data: UserAPIResponse) {
        // Adicionando os dados da session no local storage do navegador
        // No local storage guardamos como texto os valores
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data.user)); // Convertendo para string
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token);

        // Adicionando um cabeçalho padrão nas requisições quando usuário loga
        // Todas as requisições feitas para api o token vai esta anexado ao cabeçalho da requisição
        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        
        // Guardando o estado da session
        setSession(data);
    }

    function remove() {
        // Setando o estado da session para null
        setSession(null);

        // Removendo as credenciais do local storage
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);

        // Redirecionando usuario para a tela inicial
        window.location.assign("/");
    }

    function loadUser() {
        const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);
        const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);

        if(token && user) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            setSession({
                token,
                user: JSON.parse(user) // Convertendo para objeto
            })
        }

        setIsLoading(false);
    }

    useEffect(() => {
        loadUser()
    }, []);

    return (
        // Provendo a session e o save que é uma função que guarda o estado da session 
        <AuthContext.Provider value={{ session, save, isLoading, remove }}>
            {children}
        </AuthContext.Provider>
    )
}