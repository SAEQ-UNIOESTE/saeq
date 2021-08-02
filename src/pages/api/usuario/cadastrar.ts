import { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import Cifrador from "../../../services/cifrador";
import { tipoCadastrarUsuario } from "../../../services/tipo_usuario";
import "crypto-js";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  var utilizar_nome_social:boolean
  const senha = geraStringAleatoria(8)
  console.log('A nova senha é "' + senha + '"')
  const cadastro:Date = new Date

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

  const verificacao = await verifica_existencia(novo_usuario.cpf)
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

  console.log('Novo usuário cadastrado')
  res.json({erro: false, mensagem: "Novo usuário cadastrado"})
}

async function verifica_existencia(cpf:string) {
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
    return -1
  } finally {
    await prisma.$disconnect()
  }

  return retorno
}

async function cadastra_usuario(novo_usuario:tipoCadastrarUsuario) {
  const prisma = new PrismaClient()

  const combinacao  = novo_usuario.palavra_um + " " + novo_usuario.palavra_dois + " " + novo_usuario.palavra_tres
  const chave       = novo_usuario.cadastro.toString() + " | " + combinacao

  const senha_cifrada      = new Cifrador().cifrar(novo_usuario.senha,     chave, combinacao)
  const nivel_cifrado      = new Cifrador().cifrar(novo_usuario.nivel,     chave, combinacao)
  const nome_cifrado       = new Cifrador().cifrar(novo_usuario.nome,      chave, combinacao)
  const sobrenome_cifrado  = new Cifrador().cifrar(novo_usuario.sobrenome, chave, combinacao)

  var _usuario_hash = require("crypto-js")
  _usuario_hash = _usuario_hash.HmacSHA512(novo_usuario.usuario, combinacao)
  const usuario_hash:string = _usuario_hash.toString()

  const email_cifrado      = new Cifrador().cifrar(novo_usuario.email,    combinacao, combinacao)
  const telefone_cifrado   = new Cifrador().cifrar(novo_usuario.telefone, combinacao, combinacao)
  const cpf_cifrado        = new Cifrador().cifrar(novo_usuario.cpf,      combinacao, combinacao)

  var nome_social_cifrado      = null
  var sobrenome_social_cifrado = null
  
  if (novo_usuario.utilizar_nome_social == true) {
    nome_social_cifrado      = new Cifrador().cifrar(novo_usuario.nome_social,      chave, combinacao)
    sobrenome_social_cifrado = new Cifrador().cifrar(novo_usuario.sobrenome_social, chave, combinacao)
  }

  try {
    const resultado = await prisma.usuarios.create({
      data: {
        logavel: true,
        data_de_cadastro: novo_usuario.cadastro,
        usuario: usuario_hash,
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
  } catch(e) {
    return -1
  } finally {
    await prisma.$disconnect()
  }

  return 0;
}

async function cadastra_triade(cpf:string, palavra_um:string, palavra_dois:string, palavra_tres:string) {
  const prisma = new PrismaClient()
  
  var _cpf_hash = require("crypto-js")
  _cpf_hash = _cpf_hash.HmacSHA256(cpf, "aqule sol amarelo")
  const cpf_hash:string = _cpf_hash.toString()

  var _palavra_um_cifrada = require("crypto-js");
  _palavra_um_cifrada = _palavra_um_cifrada.HmacSHA512(palavra_um, cpf)
  const palavra_um_cifrada:string = _palavra_um_cifrada.toString()

  var _palavra_dois_cifrada = require("crypto-js");
  _palavra_dois_cifrada = _palavra_dois_cifrada.HmacSHA512(palavra_dois, cpf)
  const palavra_dois_cifrada:string = _palavra_dois_cifrada.toString()

  var _palavra_tres_cifrada = require("crypto-js");
  _palavra_tres_cifrada = _palavra_tres_cifrada.HmacSHA512(palavra_tres, cpf)
  const palavra_tres_cifrada:string = _palavra_tres_cifrada.toString()

  try {
    const resultado = await prisma.triade.create({
      data: {
        id: cpf_hash,
        palavra_um: palavra_um_cifrada,
        palavra_dois: palavra_dois_cifrada,
        palavra_tres: palavra_tres_cifrada,
      },
    })
  } catch(e) {
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