import Cabecalho from "../components/cabecalho";
import withSession from "../../lib/session";
import PropTypes from "prop-types";
import fetchJson from "../../lib/fetchJson";
import React, { useState } from "react";
import mutateUser from "../../lib/useUser";

const Sair = ({ user }) => {
  async function sair() {
    try {
      mutateUser(
        await fetchJson("/api/usuario/sair", {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        })

      )
    } catch (error:any) {
      console.error("An unexpected error happened:", error);
    }
  }
  sair()
  return (
    <>
      <><h1>Você pode sair agora!</h1></>
    </>
  );
};

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user")

  if (user === undefined) {
    res.setHeader("location", "/login")
    res.statusCode = 302
    res.end()
    return { props: {} }
  }

  return {
    props: { user: req.session.get("user") }
  }
})

export default Sair

Sair.propTypes = {
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    dados: PropTypes.shape({
      id: PropTypes.number,
      cpf: PropTypes.string,
      logavel: PropTypes.bool,
      nivel: PropTypes.string,
      cadastro: PropTypes.string,
      usuario: PropTypes.string,
      senha: PropTypes.string,
      email: PropTypes.string,
      telefone: PropTypes.string,
      nome: PropTypes.string,
      sobrenome: PropTypes.string,
      utilizar_nome_social: PropTypes.bool,
      nome_social: PropTypes.string,
      sobrenome_social: PropTypes.string,
    })
  })
}

/*
import React, { useState } from "react";
import useUser from "../../lib/useUser";
import fetchJson from "../../lib/fetchJson";
import user from "./api/usuario/user";

export default function Sair() {
  const { mutateUser } = useUser({
    redirectTo: "/sair",
    redirectIfFound: false,
  })

  async function sair() {
    try {
      mutateUser(
        await fetchJson("/api/usuario/sair", {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        })

      )
    } catch (error:any) {
      console.error("An unexpected error happened:", error);
    }
  }

  sair()

  return (
    <>
      <h1>Agora vocês está livre para sair</h1>
    </>
  )
}
*/