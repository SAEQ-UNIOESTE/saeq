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