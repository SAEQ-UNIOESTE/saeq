import Cabecalho from "../components/cabecalho";
import useUser from "../../lib/useUser";
import useEvents from "../../lib/useEvents";
import Router from 'next/router';

export default function Inicio() {
  const { user } = useUser({ redirectTo: "/login" });
  const { events, loadingEvents } = useEvents(user);

  if (!user?.isLoggedIn || loadingEvents) {
    Router.push('/login')
  }
  return (
    <>
      <Cabecalho pagina="Ínicio" />
      <div className="p-5 text-center">
        <h1 className="h1">Olá, tudo bem?</h1>
        <h2 className="h3">Este é o sistema SAEQ</h2>
        <p>É um prazer ter você aqui!</p>
      </div>
    </>
  )
}