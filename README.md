# SAEQ-WEB

## Executando

Primeiro, instale o [Node.js](https://nodejs.org/) em sua máquina.

Segundo, instale as dependências do projeto:

```bash
npm install next react react-dom crypto-js react-hook-form dotenv-webpack typescript @types/react prisma @prisma/client @prisma/studio
```

Terceiro, gere os arquivos necessários através do comando abaixo.

```bash
npx create-next-app saeq-web
```

Quarto, clone o repositório do projeto no [GitHub](https://github.com/SAEQ-UNIOESTE/saeq-web).

Quinto, copie para dentro do diretório clonado a pasta <code>node_modules</code> gerada no terceiro passo.
  
Sexto, execute o comando abaixo para inicializar a aplicação (é necessário estar dentro do diretório clonado).

```bash
npm run dev
```

Sétimo, abra o link [http://localhost:3000](http://localhost:3000) no seu navegador.

## Configuração do banco de dados para desenvolvimento

Primeiro instale o Docker:

```bash
https://docs.docker.com/
```

Após o daemon do docker estar rodando em sua máquina, baixe e configure um container do `postgresql`:

```bash
sudo docker volume create postgres-volume
sudo docker run -d --name=postgres13 -p 5432:5432 -v postgres-volume:/var/lib/postgresql/data -e POSTGRES_PASSWORD=password postgres
sudo docker start $ID_DO_CONTAINER
```

Isso irá criar um servidor postgresql com o usuário `postgres` e senha `password` rodando em `http://localhost:5432`.

Em seguida adicione um arquivo `.env` na raiz do projeto com o conteúdo:

```bash
DATABASE_URL="postgresql://postgresql:password@localhost:5432/mydb?schema=public"
```
