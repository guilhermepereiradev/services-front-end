export interface Funcionario {
    idFuncionario?: number, // ? torna o id não opcional
    nome: string,
    email: string,
    foto: string,
    cargo?: object
}