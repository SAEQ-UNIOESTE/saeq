import Cabecalho from "../../components/cabecalho";
import React from "react";
import withSession from "../../../lib/session";
import PropTypes from "prop-types";

const Coordenador = ({ user }) => {
  var nome_exibicao:String
  const caminho = "static/relatorios/" + user.dados.curso
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
            <h1 className="h4">Clique no botão abaixo para acessar o relatório</h1>
            <a className="btn btn-outline-light" href={caminho}>Acessar relatório</a>
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

export default Coordenador;

Coordenador.propTypes = {
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