import Link from "next/link";

import Cabecalho from "../../components/cabecalho";

export default function GerenciarAlunos() {
  return (
    <>
      <Cabecalho pagina="Gerenciar Alunos" nivel="funcionario" subir="../" />
      <div className="p-5">
      <p>Para adicionar um novo aluno <Link href="/funcionario/cadastrar_aluno">clique aqui</Link>.</p>
      </div>
    </>
  )
}