export type tipoUsuario = {
    id: number;
    cpf: String;
    logavel: boolean;
    nivel: String;
    cadastro: String;
    usuario: String;
    senha: String;
    email: String;
    telefone: String;
    nome: String;
    sobrenome: String;
    utilizar_nome_social: boolean;
    nome_social: String;
    sobrenome_social: String;
    palavra_um: String;
    palavra_dois: String;
    palavra_tres: String;
};

export type tipoCadastrarUsuario = {
    cpf: String;
    logavel: boolean;
    nivel: String;
    cadastro: Date;
    usuario: String;
    senha: String;
    email: String;
    telefone: String;
    nome: String;
    sobrenome: String;
    utilizar_nome_social: boolean;
    nome_social: String;
    sobrenome_social: String;
    palavra_um: String;
    palavra_dois: String;
    palavra_tres: String;
};