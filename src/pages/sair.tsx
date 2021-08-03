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
      <div className="p-5 text-center">
        <h1 className="h3">Pronto, deslogado!</h1>
        <p>Você pode fechar a página agora</p>
      </div>
    </>
  );
};

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user")

  if (user === undefined) {
    res.setHeader("location", "/sair")
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
      curso: PropTypes.string,
      nome: PropTypes.string,
      sobrenome: PropTypes.string,
      utilizar_nome_social: PropTypes.bool,
      nome_social: PropTypes.string,
      sobrenome_social: PropTypes.string,
    })
  })
}