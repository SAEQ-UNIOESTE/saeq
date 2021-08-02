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
  console.log(usuario)
  const combinacao = usuario.palavra_um + " " + usuario.palavra_dois + " " + usuario.palavra_tres
  const _busca_usuario = await buscar_usuario(usuario.usuario, combinacao)
  if(_busca_usuario == null || _busca_usuario == -1) {
    res.json({erro: true, mensagem: "Usuário não encontrado ou erro na busca", retorno: _busca_usuario})
    return
  }
  console.log(_busca_usuario)
  // const cadastro_do_usuario:tipoUsuario = await descifra_usuario(busca_usuario, combinacao)
}


  

  
/*
  const senha_cifrada      = new Cifrador(novo_usuario.senha,     chave, combinacao).cifrar()
  const nivel_cifrado      = new Cifrador(novo_usuario.nivel,     chave, combinacao).cifrar()
  const nome_cifrado       = new Cifrador(novo_usuario.nome,      chave, combinacao).cifrar()
  const sobrenome_cifrado  = new Cifrador(novo_usuario.sobrenome, chave, combinacao).cifrar()

  const usuario_cifrado    = new Cifrador(novo_usuario.usuario,  combinacao, combinacao).cifrar()
  const email_cifrado      = new Cifrador(novo_usuario.email,    combinacao, combinacao).cifrar()
  const telefone_cifrado   = new Cifrador(novo_usuario.telefone, combinacao, combinacao).cifrar()
  const cpf_cifrado        = new Cifrador(novo_usuario.cpf,      combinacao, combinacao).cifrar()

  var nome_social_cifrado      = null
  var sobrenome_social_cifrado = null
  
  if (novo_usuario.utilizar_nome_social == true) {
    nome_social_cifrado      = new Cifrador(novo_usuario.nome_social,      chave, combinacao).cifrar()
    sobrenome_social_cifrado = new Cifrador(novo_usuario.sobrenome_social, chave, combinacao).cifrar()
  }

  try {
    const resultado = await prisma.usuarios.create({
      data: {
        logavel: true,
        data_de_cadastro: novo_usuario.cadastro,
        usuario: usuario_cifrado,
        senha: senha_cifrada,
        email_principal: email_cifrado,
        telefone_principal: telefone_cifrado,
        nome: nome_cifrado,
        sobrenome: sobrenome_cifrado,
        utilizar_nome_social: novo_usuario.utilizar_nome_social,
        nome_social: nome_social_cifrado,
        sobrenome_social: sobrenome_social_cifrado,
        nivel: nivel_cifrado,
        cpf: cpf_cifrado,
      },
    })
    console.log(resultado)
  } catch(e) {
    return -1
  } finally {
    await prisma.$disconnect()
  }

  return 0;
}
*/

async function buscar_usuario(usuario:string, combinacao:string) {
  var retorno
  const prisma = new PrismaClient()

  var _usuariio_hash = require("crypto-js");
  _usuariio_hash = _usuariio_hash.HmacSHA256(usuario, combinacao)
  const usuario_hash:string = _usuariio_hash.toString()
  
  try {
    const resultado = await prisma.usuarios.findUnique({
      where: {
        usuario: usuario_hash,
      },
    })
    
    console.log(usuario + " = " + usuario_hash)
    
    retorno = resultado
  } catch(e) {
    console.log(e)
    return -1
  } finally {
    await prisma.$disconnect()
  }

  return retorno
}
