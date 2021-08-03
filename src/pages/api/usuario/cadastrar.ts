import { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import { tipoCadastrarUsuario } from "../../../services/tipo_usuario";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const senha = geraStringAleatoria(8)
  console.log('A nova senha é "' + senha + '"')
  const cadastro:Date = new Date

  const novo_usuario:tipoCadastrarUsuario = {
    logavel: true,
    cadastro: cadastro,
    usuario: req.body.novo_usuario.usuario,
    senha: senha,
    email: req.body.novo_usuario.email,
    telefone: req.body.novo_usuario.telefone,
    curso: req.body.novo_usuario.curso,
    nome: req.body.novo_usuario.nome,
    sobrenome: req.body.novo_usuario.sobrenome,
    utilizar_nome_social: req.body.novo_usuario.utilizar_nome_social,
    nome_social: req.body.novo_usuario.nome_social,
    sobrenome_social: req.body.novo_usuario.sobrenome_social,
    nivel: req.body.novo_usuario.nivel,
    cpf: req.body.novo_usuario.cpf,
  }
  const cadastro_do_usuario = await cadastra_usuario(novo_usuario)
  console.log(cadastro_do_usuario)
  if (cadastro_do_usuario != 0) {
    res.status(500)
    res.json({erro: true, mensagem: "Não foi possível inserir o usuário na base de dados"})
    return
  }
  console.log('Novo usuário cadastrado')
  res.json({erro: false, mensagem: "Novo usuário cadastrado"})
}

async function cadastra_usuario(novo_usuario:tipoCadastrarUsuario) {
  const prisma = new PrismaClient()
  try {
    const resultado = await prisma.usuarios.create({
      data: {
        logavel: true,
        data_de_cadastro: novo_usuario.cadastro,
        usuario: novo_usuario.usuario,
        senha: novo_usuario.senha,
        email_principal: novo_usuario.email,
        telefone_principal: novo_usuario.telefone,
        curso: novo_usuario.curso,
        nome: novo_usuario.nome,
        sobrenome: novo_usuario.sobrenome,
        utilizar_nome_social: novo_usuario.utilizar_nome_social,
        nome_social: novo_usuario.nome_social,
        sobrenome_social: novo_usuario.sobrenome_social,
        nivel: novo_usuario.nivel,
        cpf: novo_usuario.cpf,
      },
    })
  } catch(e) {
    console.log(e)
    return -1
  } finally {
    await prisma.$disconnect()
  }

  return 0;
}

function geraStringAleatoria(tamanho:number) {
  var stringAleatoria = '';
  var caracteres = 'ABCDEFGHIJ0123456789';
  for (var i = 0; i < tamanho; i++) {
      stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return stringAleatoria;
}