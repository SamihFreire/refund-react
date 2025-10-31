import { AuthProvider } from "./contexts/AuthContext"

import { Routes } from "./routes"

export function App() {
  return(

    // Provendo um contexto global para todas as rotas
    // Todas as rotas terão acesso ao dados desse contexto
    // Comentamos esse <AuthContext/> para levar para o arquivo AuthContext.tsx, para centralizar
    
    // <AuthContext.Provider value={{ name: "Samih" }}>
    <AuthProvider> {/*Criamos a função AuthProvider que provê o contexto global*/}
      <Routes />
    </AuthProvider>
    // </AuthContext.Provider>
  )
}