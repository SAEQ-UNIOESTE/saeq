import Cabecalho from "../components/cabecalho";
import useUser from "../../lib/useUser";
import { redirect } from "next/dist/next-server/server/api-utils";

export default function Inicio() {
  const { user } = useUser();

  var nome_exibicao = ''
  var nivel = ''
  var nome_social = false

  if (user.dados.utilizar_nome_social === true) {
    nome_social = true
  }

  if (nome_social === false) {
    nome_exibicao = user.dados.nome
  } else {
    nome_exibicao = user.dados.nome_social
  }
  
  return (
    <>
      <Cabecalho pagina="Ínicio" nivel={user.dados.nivel} />
      <div className="p-5 text-center">
        <h1 className="h1">Olá, {nome_exibicao}, tudo bem?</h1>
        <h2 className="h3">Este é o sistema SAEQ</h2>
        <p>É um prazer ter você aqui!</p>
      </div>
    </>
  )
}