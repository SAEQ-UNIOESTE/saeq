import Link from "next/link";

import Cabecalho from "../../components/cabecalho";

export default function GerenciarSecretarios() {

  return (
    <>
      <Cabecalho pagina="Gerenciar Funcionário" nivel="funcionario" subir="../" />
      <p>Para adicionar um novo funcionário <Link href="/funcionario/cadastrar_funcionario">clique aqui</Link>.</p>
    </>
  )
}