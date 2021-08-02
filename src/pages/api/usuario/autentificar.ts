import { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import Cifrador from "../../../services/cifrador";
import { tipoLogarUsuario, tipoUsuario } from "../../../services/tipo_usuario";
import "crypto-js";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const usuario:tipoLogarUsuario = {
    usuario: req.body.usuario.usuario,
    senha: req.body.usuario.senha,
    palavra_um: req.body.usuario.palavra_um,
    palavra_dois: req.body.usuario.palavra_dois,
    palavra_tres: req.body.usuario.palavra_tres,
  }

  const combinacao = usuario.palavra_um + " " + usuario.palavra_dois + " " + usuario.palavra_tres
  const busca_usuario = await buscar_usuario(usuario.usuario, combinacao)
  if(busca_usuario == null || busca_usuario == -1) {
    res.json({erro: true, mensagem: "Usuário não encontrado ou erro na busca", retorno: busca_usuario})
    return
  }

  const cadastro_do_usuario = await descifra_usuario(busca_usuario, combinacao)
}

async function descifra_usuario(busca_usuario, combinacao:string) {
  const novo_usuario:tipoUsuario = {
    logavel: busca_usuario.logavel,
    cadastro: busca_usuario.cadastrado,
    usuario: busca_usuario.usuario,
    senha: busca_usuario.senha,
    email: busca_usuario.email,
    telefone: busca_usuario.telefone,
    nome: busca_usuario.nome,
    sobrenome: busca_usuario.novo_usuario.sobrenome,
    utilizar_nome_social: busca_usuario.utilizar_nome_social,
    nome_social: busca_usuario.nome_social,
    sobrenome_social: busca_usuario.sobrenome_social,
    nivel: busca_usuario.nivel,
    cpf: busca_usuario.cpf,
    palavra_um: busca_usuario.palavra_um,
    palavra_dois: busca_usuario.palavra_dois,
    palavra_tres: busca_usuario.palavra_tres,
  }
}

async function buscar_usuario(usuario:string, combinacao:string) {
  var retorno
  const prisma = new PrismaClient()

  var _usuario_hash = require("crypto-js")
  _usuario_hash = _usuario_hash.HmacSHA512(usuario, combinacao)
  const usuario_hash:string = _usuario_hash.toString()
  
  try {
    const resultado = await prisma.usuarios.findUnique({
      where: {
        usuario: usuario_hash,
      },
    })
    
    retorno = resultado
  } catch(e) {
    return -1
  } finally {
    await prisma.$disconnect()
  }

  return retorno
}
