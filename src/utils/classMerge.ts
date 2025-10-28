import { clsx, type ClassValue } from "clsx";

import { twMerge } from "tailwind-merge"

// Trabalhando com junção de classes
export function classMerge(...inputs: ClassValue[]){
    // O clsx pega o array de classes e unifica tudo e devolve pro twMerge
    // O twMerge vai organizar as classes recebidas para serem utilizadas pelo tailwind com performance e sem duplicidade
    return twMerge(clsx(inputs))
}