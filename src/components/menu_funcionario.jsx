import Link from "next/link"

export default function MenuFuncionario() {
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
          <Link href="/funcionario/gerenciar_funcionarios"><a class="nav-link" href="#" tabindex="-1" aria-disabled="true">Gerenciar Funcionários</a></Link>
        </li>
        <li class="nav-item">
          <Link href="/funcionario/gerenciar_coordenadores"><a class="nav-link" href="#" tabindex="-1" aria-disabled="true">Gerenciar Coordenadores</a></Link>
        </li>
        <li class="nav-item">
          <Link href="/funcionario/gerenciar_alunos"><a class="nav-link" href="#" tabindex="-1" aria-disabled="true">Gerenciar Alunos</a></Link>
        </li>
      </ul>
      <div class="d-flex">
        <Link href="/sair"><a class="btn btn-outline-light">Sair</a></Link>
      </div>
    </div>
  )
}