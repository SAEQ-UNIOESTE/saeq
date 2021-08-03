import Cabecalho from "../components/cabecalho";
import useUser from "../../lib/useUser";
import withSession from "../../lib/session";

export default function Inicio() {
  const { user } = useUser({ redirectTo: "/login" });
  return (
    <>
      <Cabecalho pagina="Ínicio" />
      <div className="p-5 text-center">
        <h1 className="h1">Olá, tudo bem?</h1>
        <h2 className="h3">Este é o sistema SAEQ</h2>
        <p>É um prazer ter você aqui!</p>
        <p>{JSON.stringify(user, null, 2)}</p>
      </div>
    </>
  )
}