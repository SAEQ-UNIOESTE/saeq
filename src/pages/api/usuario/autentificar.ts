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
  const id = await buscar_id_do_usuario(usuario.usuario, combinacao)
  if(id === null || id == -1) {
    res.json({erro: true, mensagem: "Usuário não encontrado ou erro na busca", retorno_id: id})
    return
  }

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

async function buscar_id_do_usuario(usuario:String, combinacao:String) {
  var retorno
  const prisma = new PrismaClient()

  const usuario_cifrado = new Cifrador(usuario, combinacao, combinacao).cifrar()
  
  try {
    const resultado = await prisma.triade.findUnique({
      where: {
        usuario: usuario_cifrado,
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
