import '../styles/globals.css'
import "../styles/bootstrap.min.css"
import type { AppProps } from 'next/app'
import { tipoSessaoUsuaio } from '../services/tipo_usuario'

var sessao:tipoSessaoUsuaio = {
  id: -1,
  cpf: '',
  nivel: '',
  cadastro: '',
  usuario: '',
  email: '',
  telefone: '',
  nome: '',
  sobrenome: '',
  utilizar_nome_social: false,
  nome_social: '',
  sobrenome_social: '',
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
