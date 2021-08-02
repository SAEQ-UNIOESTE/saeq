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
  console.log(cadastro_do_usuario)
}

async function descifra_usuario(busca_de_usuario:any, combinacao:string) {
  const prisma = new PrismaClient()
  console.log(busca_de_usuario)

  const chave              = busca_de_usuario.cadastro.toString() + " | " + combinacao
  const senha_cifrada      = new Cifrador().descifrar(busca_de_usuario.senha,     chave, combinacao)
  const nivel_cifrado      = new Cifrador().descifrar(busca_de_usuario.nivel,     chave, combinacao)
  const nome_cifrado       = new Cifrador().descifrar(busca_de_usuario.nome,      chave, combinacao)
  const sobrenome_cifrado  = new Cifrador().descifrar(busca_de_usuario.sobrenome, chave, combinacao)

  const email_cifrado     = new Cifrador().descifrar(busca_de_usuario.email,    combinacao, combinacao)
  const telefone_cifrado  = new Cifrador().descifrar(busca_de_usuario.telefone, combinacao, combinacao)
  const cpf_cifrado       = new Cifrador().descifrar(busca_de_usuario.cpf,      combinacao, combinacao)

  var nome_social_cifrado      = null
  var sobrenome_social_cifrado = null
  
  if (busca_de_usuario.utilizar_nome_social == true) {
    nome_social_cifrado      = new Cifrador().descifrar(busca_de_usuario.nome_social,      chave, combinacao)
    sobrenome_social_cifrado = new Cifrador().descifrar(busca_de_usuario.sobrenome_social, chave, combinacao)
  }

  const usuario:tipoUsuario = {
    id: busca_de_usuario.id,
    logavel: busca_de_usuario.logavel,
    cadastro: busca_de_usuario.cadastrado,
    usuario: busca_de_usuario.usuario,
    senha: senha_cifrada,
    email: email_cifrado,
    telefone: telefone_cifrado,
    nome: nome_cifrado,
    sobrenome: sobrenome_cifrado,
    utilizar_nome_social: busca_de_usuario.utilizar_nome_social,
    nome_social: nome_social_cifrado,
    sobrenome_social: sobrenome_social_cifrado,
    nivel: nivel_cifrado,
    cpf: cpf_cifrado,
  }

  return usuario
}

async function buscar_usuario(usuario:string, combinacao:string) {
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
    return -1
  } finally {
    await prisma.$disconnect()
  }
  return retorno
}
