import withSession from "../../../../lib/session";
import { PrismaClient } from "@prisma/client";
import { tipoLogarUsuario } from "../../../services/tipo_usuario";

export default withSession(async (req, res) => {
  const usuario:tipoLogarUsuario = {
    usuario: await req.body.usuario.usuario,
    senha: await req.body.usuario.senha,
  }
  console.log(usuario)
  const prisma = new PrismaClient()
  try {
    const dados = await prisma.usuarios.findUnique({
      where: {
        usuario: usuario.usuario,
      },
    })
    if(dados === null) {
      res.json({erro: true, mensagem: "Usuário não encontrado!"})
      res.end()
      return
    }
    if(!(dados.senha === usuario.senha)) {
      res.json({erro: true, mensagem: "Senha incorreta!"})
      res.end()
      return
    }
    const user = { isLoggedIn: true, dados };
    req.session.set("user", user);
    await req.session.save();
    res.json(user);
  } catch (error) {
    console.log(error)
  } finally {
    await prisma.$disconnect()
  }
});



/*
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

*/