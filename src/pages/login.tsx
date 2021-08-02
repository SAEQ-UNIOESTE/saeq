
import Link from "next/link";
import Cabecalho from "../components/cabecalho";

export default function Login() {
  return (
    <>
      <Cabecalho pagina="Login" />
      <div className="p-5 text-left">
        <div className="card login-card">
          <div className="card-body">
            <FormularioDeLogin />
          </div>
        </div>
      </div>
    </>
  )
}

function FormularioDeLogin() {
  const formulario = async (event:React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      usuario: { value: string }
      senha: { value: string }
    };

    const res = await fetch(
      'http://localhost:3000/api/usuario/autentificar',
      {
        body: JSON.stringify({
          usuario: {
            usuario: target.usuario.value,
            senha: target.senha.value,
          }
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
  
  return(
    <form onSubmit={formulario}>
      <fieldset>
        <legend>Entrar no sistema SAEQ</legend>
        <div className="mb-3 pt-4">
          <label htmlFor="usuario" className="form-label">Login</label>
          <input  type="text" id="usuario" className="form-control" placeholder="Ana.Santos56" name="usuario"></input>
        </div>
        <div className="mb-4">
          <label htmlFor="senha" className="form-label">Senha</label>
          <input type="password" id="senha" className="form-control" placeholder="MinhaSenha302" name="senha"></input>
        </div>
        <div className="text-center mb-4">
          <Link href="/recuperar_login_senha" ><a>Esqueci meu login ou senha</a></Link>
        </div>
        <div className="text-center"><button type="submit" className="btn btn-outline-primary">Entrar</button></div>
      </fieldset>
    </form>
  )
}