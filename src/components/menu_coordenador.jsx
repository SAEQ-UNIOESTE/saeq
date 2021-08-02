import Link from "next/link"

export default function MenuCoordenadores() {
  return (
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link href="/"><a class="nav-link" aria-current="page">Início</a></Link>
        </li>
        <li class="nav-item">
          <Link href="/meus_dados"><a class="nav-link" href="#">Meus Dados</a></Link>
        </li>
        <li class="nav-item">
          <Link href="/coordenador/relatorio"><a class="nav-link" href="#" tabindex="-1" aria-disabled="true">Relatório do Curso</a></Link>
        </li>
      </ul>
      <div class="d-flex">
        <Link href="/sair"><a class="btn btn-outline-light">Sair</a></Link>
      </div>
    </div>
  )
}