// dtos -> abreviação para data transfer objects
// Onde guardaremos a representação dos dados que trafegam entre o Backend e o Frontend
// Criamos uma tipagem global definindo o arquivo nesse formato user.d.ts

type UserAPIRole = "employee" | "manager";

type UserAPIResponse = {
    token: string,
    user: {
        id: string,
        name: string,
        email: string,
        role: UserAPIRole,
    },
}