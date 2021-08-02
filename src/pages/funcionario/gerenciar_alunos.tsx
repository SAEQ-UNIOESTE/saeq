import Link from "next/link";

import Cabecalho from "../../components/cabecalho";

export default function GerenciarAlunos() {
  return (
    <>
      <Cabecalho pagina="Gerenciar Alunos" nivel="funcionario" subir="../" />
      <p>Para adicionar um novo aluno <Link href="/funcionario/cadastrar_aluno">clique aqui</Link>.</p>
    </>
  )
}