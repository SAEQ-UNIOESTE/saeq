export type tipoUsuario = {
    id: number;
    cpf: string;
    logavel: boolean;
    nivel: string;
    cadastro: string;
    usuario: string;
    senha: string;
    email: string;
    telefone: string;
    curso: string;
    nome: string;
    sobrenome: string;
    utilizar_nome_social: boolean;
    nome_social: string;
    sobrenome_social: string;
};

export type tipoSessaoUsuaio = {
    id: number;
    cpf: string;
    nivel: string;
    cadastro: string;
    usuario: string;
    email: string;
    telefone: string;
    nome: string;
    sobrenome: string;
    utilizar_nome_social: boolean;
    nome_social: string;
    sobrenome_social: string;
}

export type tipoCadastrarUsuario = {
    cpf: string;
    logavel: boolean;
    nivel: string;
    cadastro: Date;
    usuario: string;
    senha: string;
    email: string;
    telefone: string;
    curso: string;
    nome: string;
    sobrenome: string;
    utilizar_nome_social: boolean;
    nome_social: string;
    sobrenome_social: string;
};

export type tipoLogarUsuario = {
    usuario: string;
    senha: string;
};