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
})