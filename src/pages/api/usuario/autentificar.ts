import { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import { tipoLogarUsuario, tipoUsuario } from "../../../services/tipo_usuario";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const usuario:tipoLogarUsuario = {
    usuario: req.body.usuario.usuario,
    senha: req.body.usuario.senha,
  }
  const busca_usuario = await buscar_usuario(usuario.usuario)
  if(busca_usuario === null || busca_usuario === -1) {
    res.json({erro: true, mensagem: "Usuário não encontrado ou erro na busca", retorno: busca_usuario})
    return
  }

  console.log(busca_usuario)
}

async function descifra_usuario(busca_de_usuario:any, combinacao:string) {
  const prisma = new PrismaClient()

  const usuario:tipoUsuario = {
    id: busca_de_usuario.id,
    logavel: busca_de_usuario.logavel,
    cadastro: busca_de_usuario.cadastrado,
    usuario: busca_de_usuario.usuario,
    senha: busca_de_usuario.senha,
    email: busca_de_usuario.email,
    telefone: busca_de_usuario.telefone,
    nome: busca_de_usuario.nome,
    sobrenome: busca_de_usuario.sobrenome,
    utilizar_nome_social: busca_de_usuario.utilizar_nome_social,
    nome_social: busca_de_usuario.nome_social,
    sobrenome_social: busca_de_usuario.sobrenome_social,
    nivel: busca_de_usuario.nivel,
    cpf: busca_de_usuario.cpf,
  }
  return usuario
}

async function buscar_usuario(usuario:string) {
  var retorno
  const prisma = new PrismaClient()
  
  try {
    const resultado = await prisma.usuarios.findUnique({
      where: {
        usuario: usuario,
      },
    })
    retorno = resultado
  } catch(e) {
    console.log(e)
    return -1
  } finally {
    await prisma.$disconnect()
  }
  return retorno
}
