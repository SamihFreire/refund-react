import { useState } from "react"
import { z, ZodError } from "zod"
import { AxiosError } from "axios"
import { useNavigate } from "react-router"

import { api } from "../services/api"

import { Input } from "../components/Input"
import { Button } from "../components/Button"

// Regras de validação utilizando ZOD
const signUpSchema = z.object({
    name: z.string().trim().min(1, { message: "Informe o nome" }),
    email: z.email({ message: "E-mail inválido" }),
    password: z
        .string()
        .min(6, { message: "Senha deve ter pelo menos 6 dígitos" }),
    passwordConfirm: z.string({ message: "Confirme a senha" })
}).refine((data)=> data.password === data.passwordConfirm, { // Validamos se a senhas são iguais
    message: "As senhas não são iguais",
    path: ["passwordConfirm"],
})

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();


    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            setIsLoading(true); // Ativando o carregamento
            
            const data = signUpSchema.parse({
                name,
                email,
                password,
                passwordConfirm,
            });

            await api.post("/users", data);

            if(confirm("Cadastrado com sucesso. Deseja ir para tela de Login?")){
                navigate("/");
            }

        } catch (error) {
            console.log(error);

            // Erro vindo da validação do Zod
            // Verificamos se o erro é uma instacia de Zod
            if(error instanceof ZodError) {
                return alert(error.issues[0].message)
            }
            
            // Retornando o erro recebido via API
            if(error instanceof AxiosError) {
                return alert(error.response?.data.message);
            }

            alert("Não foi possível cadastrar!");
        } finally {
            setIsLoading(false); // Desativando carregamento
        }
    }

    return (
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-4"> 
            <Input required legend="Nome" type="" placeholder="Seu Nome" 
            onChange={(e) => setName(e.target.value)}/>

            <Input required legend="E-mail" type="email" placeholder="seu@email.com" 
            onChange={(e) => setEmail(e.target.value)}/>

            <Input required legend="Senha" type="password" placeholder="123456"
            onChange={(e) => setPassword(e.target.value)} />

            <Input required legend="Confirme a senha" type="password" placeholder="123456"
            onChange={(e) => setPasswordConfirm(e.target.value)} />

            <Button type="submit" isLoading={isLoading}>Cadastrar</Button>

            <a 
                href="/"
                className="text-sm font-semibold text-gray-100 mt-10 mb-4
                text-center hover:text-green-800 transition ease-linear"
            >
                Já tenho uma conta
            </a>
        </form>
    )
}