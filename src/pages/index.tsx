import Cabecalho from "../components/cabecalho";
import React from "react";
import withSession from "../../lib/session";
import PropTypes from "prop-types";

const Inicio = ({ user }) => {
  var nome_exibicao:String
  if (user.dados.utilizar_nome_social===true) {
    nome_exibicao = user.dados.nome_social
  } else {
    nome_exibicao = user.dados.nome
  }
  return (
    <>
      {user?.isLoggedIn && (
        <>
          <Cabecalho pagina="Início" nivel={user.dados.nivel} />
          <div className="p-5 text-center">
            <h1 className="h1">Olá, {nome_exibicao}, tudo bem?</h1>
            <h2 className="h3">Este é o sistema SAEQ</h2>
            <p>É um prazer ter você aqui!</p>
          </div>
        </>
      )}
    </>
  );
};

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: { user: req.session.get("user") },
  };
});

export default Inicio;

Inicio.propTypes = {
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

export default function Inicio() {
  return (
    <>
      <Cabecalho pagina="Ínicio" nivel={user.dados.nivel} />
      <div className="p-5 text-center">
        <h1 className="h1">Olá, {nome_exibicao}, tudo bem?</h1>
        <h2 className="h3">Este é o sistema SAEQ</h2>
        <p>É um prazer ter você aqui!</p>
      </div>
    </>
  )
}

*/