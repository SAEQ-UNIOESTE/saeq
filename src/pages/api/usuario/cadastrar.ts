import { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import Cifrador from "../../../services/cifrador";
import { tipoCadastrarUsuario, tipoUsuario } from "../../../services/tipo_usuario";
import "crypto-js";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  var utilizar_nome_social:boolean
  const senha = geraStringAleatoria(8)
  const cadastro:Date = new Date // tem que converter para YYYY-MM-DD HH:MM:SS | depois, converter para string

  if (req.body.novo_usuario.utilizar_nome_social == 'on') {
    utilizar_nome_social = true
  } else {
    utilizar_nome_social = false
  }

  const novo_usuario:tipoCadastrarUsuario = {
    logavel: true,
    cadastro: cadastro,
    usuario: req.body.novo_usuario.usuario,
    senha: senha,
    email: req.body.novo_usuario.email,
    telefone: req.body.novo_usuario.telefone,
    nome: req.body.novo_usuario.nome,
    sobrenome: req.body.novo_usuario.sobrenome,
    utilizar_nome_social: utilizar_nome_social,
    nome_social: req.body.novo_usuario.nome_social,
    sobrenome_social: req.body.novo_usuario.sobrenome_social,
    nivel: req.body.novo_usuario.nivel,
    cpf: req.body.novo_usuario.cpf,
    palavra_um: req.body.novo_usuario.palavra_um,
    palavra_dois: req.body.novo_usuario.palavra_dois,
    palavra_tres: req.body.novo_usuario.palavra_tres,
  }

  console.log(novo_usuario)

  const verificacao = await verifica_existencia(novo_usuario.cpf)
  console.log(verificacao)
  if (verificacao != null) {
    res.status(500)
    res.json({erro: true, mensagem: "Esse CPF já existe na base de dados"})
    return
  }

  const cadastro_do_usuario = await cadastra_usuario(novo_usuario)
  if (cadastro_do_usuario != 0) {
    res.status(500)
    res.json({erro: true, mensagem: "Não foi possível inserir o usuário na base de dados"})
    return
  }

  const cadastro_da_triade = await cadastra_triade(novo_usuario.cpf, novo_usuario.palavra_um, novo_usuario.palavra_dois, novo_usuario.palavra_tres)
  if (cadastro_do_usuario != 0) {
    res.status(500)
    res.json({erro: true, mensagem: "Não foi possível inserir a tríade na base de dados"})
    return
  }
}

async function verifica_existencia(cpf:String) {
  var retorno
  const prisma = new PrismaClient()

  var cpf_hash = require("crypto-js")
  cpf_hash = cpf_hash.HmacSHA256(cpf, "aqule sol amarelo")
  cpf_hash = cpf_hash.toString()

  try {
    const formulario = cpf_hash
    const resultado = await prisma.triade.findUnique({
      where: {
        id: cpf_hash,
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

async function cadastra_usuario(novo_usuario:tipoCadastrarUsuario) {
  const prisma = new PrismaClient()

  const combinacao  = novo_usuario.palavra_um + " " + novo_usuario.palavra_dois + "" + novo_usuario.palavra_tres
  const chave       = novo_usuario.cadastro.toString() + " | " + combinacao

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
    console.log(e)
    return -1
  } finally {
    await prisma.$disconnect()
  }

  return 0;
}

async function cadastra_triade(cpf:String, palavra_um:String, palavra_dois:String, palavra_tres:String) {
  const prisma = new PrismaClient()
  
  var cpf_hash = require("crypto-js")
  cpf_hash = cpf_hash.HmacSHA256(cpf, "aqule sol amarelo")
  cpf_hash = cpf_hash.toString()

  var palavra_um_cifrada = require("crypto-js");
  palavra_um_cifrada = palavra_um_cifrada.HmacSHA512(palavra_um, cpf)
  palavra_um_cifrada = palavra_um_cifrada.toString()

  var palavra_dois_cifrada = require("crypto-js");
  palavra_dois_cifrada = palavra_dois_cifrada.HmacSHA512(palavra_dois, cpf)
  palavra_dois_cifrada = palavra_dois_cifrada.toString()

  var palavra_tres_cifrada = require("crypto-js");
  palavra_tres_cifrada = palavra_tres_cifrada.HmacSHA512(palavra_tres, cpf)
  palavra_tres_cifrada = palavra_tres_cifrada.toString()

  try {
    const resultado = await prisma.triade.create({
      data: {
        id: cpf_hash,
        palavra_um_cifrada: palavra_um_cifrada,
        palavra_dois_cifrada: palavra_dois_cifrada,
        palavra_tres_cifrada: palavra_tres_cifrada,
      },
    })
  } catch(e) {
    console.log(e)
    return -2
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