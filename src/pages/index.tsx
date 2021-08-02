import { NextApiRequest, NextApiResponse } from "next";
import Link from "next/link";
import Cabecalho from "../components/cabecalho";
import { withIronSession } from "next-iron-session";

export default function Login() {
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