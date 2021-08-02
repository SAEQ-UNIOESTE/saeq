import Link from "next/link";

import Cabecalho from "../../components/cabecalho";

export default function GerenciarCoordenadores() {

  return (
    <>
      <Cabecalho pagina="Gerenciar Coordenadores" nivel="funcionario" subir="../" />
      <div className="p-5">
      <p>Para adicionar um novo coordenador <Link href="/funcionario/cadastrar_coordenador">clique aqui</Link>.</p>
      <p>Para alterar o coodenador de um algum curso <Link href="/funcionario/cadastrar_coordenador">clique aqui</Link>.</p>
      </div>
    </>
  )
}