// Instalamos o axios que é uma biblioteca essencial para consumir APIs
// npm i axios
import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:3333"
})