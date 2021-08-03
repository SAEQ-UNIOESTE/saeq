import Link from "next/link";

import Cabecalho from "../../components/cabecalho";

export default function GerenciarSecretarios() {

  return (
    <>
      <Cabecalho pagina="Gerenciar Funcionário" nivel="funcionario" subir="../" />
      <div className="p-5">
      <p>Para adicionar um novo funcionário <Link href="/funcionario/cadastrar_funcionario">clique aqui</Link>.</p>
      </div>
    </>
  )
}