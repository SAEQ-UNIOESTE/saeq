import React, { useState } from "react";
import Link from "next/link";
import Cabecalho from "../components/cabecalho";
import useUser from "../../lib/useUser";
import fetchJson from "../../lib/fetchJson";

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
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event:any) {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      usuario: { value: string }
      senha: { value: string }
    };

    try {
      mutateUser(
        await fetchJson("/api/usuario/autentificar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario: {
              usuario: target.usuario.value,
              senha: target.senha.value,
            },
          }),
        }),
      );
    } catch (error:any) {
      console.error("An unexpected error happened:", error);
    }
  }
  return(
    <form onSubmit={handleSubmit}>
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