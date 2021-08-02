import Cabecalho from '../../components/cabecalho'

export default function CadastrarCoordenador() {
  return (
    <>
      <Cabecalho pagina="Cadastrar Coordenador" subir="../" nivel="funcionario" />
      <div className="p-5 text-left">
        <div className="card cadastrar-card">
          <div className="card-body">
            <FormularioDeCadastro />
          </div>
        </div>
      </div>
    </>
  )
}

function FormularioDeCadastro() {
    const formulario = async (event:React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        const target = event.target as typeof event.target & {
          cpf: { value: string },
          usuario: { value: string },
          email: { value: string },
          telefone: { value: string },
          nome: { value: string },
          sobrenome: { value: string },
          utilizar_nome_social: { value: string },
          nome_social: { value: string },
          sobrenome_social: { value: string },
        };
    
        const res = await fetch(
          'http://localhost:3000/api/usuario/cadastrar',
          {
            body: JSON.stringify({
              novo_usuario: {
                cpf: target.cpf.value,
                nivel: "coordenador",
                usuario: target.usuario.value,
                email: target.email.value,
                telefone: target.telefone.value,
                nome: target.nome.value,
                sobrenome: target.sobrenome.value,
                utilizar_nome_social: target.utilizar_nome_social.value,
                nome_social: target.nome_social.value,
                sobrenome_social: target.sobrenome_social.value,
              },
            }),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
          }
        )
        const result = await res.json()
        console.log(result)
      }

  return (
    <>
      <form onSubmit={formulario}>
        <fieldset>
          <legend>Cadastrar um novo coordenador no sistema SAEQ</legend>
          <div className="mb-3 pt-4">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input type="text" id="nome" name="nome" className="form-control" placeholder="Ana Maria"></input>
          </div>
          <div className="mb-5">
            <label htmlFor="sobrenome" className="form-label">Sobrenome</label>
            <input type="text" id="sobrenome" name="sobrenome" className="form-control" placeholder="da Cruz Oliveira"></input>
          </div>

          <div className="mb-3">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="utilizar_nome_social" name="utilizar_nome_social"></input>
              <label className="form-check-label" htmlFor="utilizar_nome_social">Utilizar nome social?</label>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="nome_social" className="form-label">Nome Social</label>
            <input type="text" id="nome_social" name="nome_social" className="form-control" placeholder="Lucas"></input>
          </div>
          <div className="mb-5">
            <label htmlFor="sobrenome_social" className="form-label">Sobrenome do Nome Social</label>
            <input type="text" id="sobrenome_social" name="sobrenome_social" className="form-control" placeholder="Oliveira dos Santos"></input>
          </div>

          <div className="mb-3">
            <label htmlFor="cpf" className="form-label">CPF</label>
            <input type="text" id="cpf" name="cpf" className="form-control" placeholder="000.000.000-00"></input>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input type="text" id="email" name="email" className="form-control" placeholder="lucas.santos@ficticio.com"></input>
          </div>
          <div className="mb-5">
            <label htmlFor="telefone" className="form-label">Telefone/Celular</label>
            <input type="text" id="telefone" name="telefone" className="form-control" placeholder="(45) 9 9988-0000"></input>
          </div>

          <div className="mb-5">
            <label htmlFor="usuario" className="form-label">Login no sistema</label>
            <input type="text" id="usuario" name="usuario" className="form-control" placeholder="Lucas.Santos399"></input>
          </div>
          <button type="submit" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Cadastrar</button>
        </fieldset>
      </form>

      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Cadastramento</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Tudo concluído!</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}