# SSABA

Este é um projeto Node.js que utiliza o Prisma como ORM para interagir com um banco de dados MySQL. Siga as instruções abaixo para iniciar o projeto e configurar o ambiente de desenvolvimento.

## Iniciando o Projeto

1. **Clone o Repositório:**

```bash
git clone https://github.com/danieloliveira004/ssaba-backend.git
```

2. **Instale as Dependências**

```bash
cd ssaba-backend
npm install
```

3. **Configure o Arquivo .env**

```bash
DATABASE_URL=mysql://usuario:senha@localhost:3306/nome_do_banco
```

4. **Execute as Migrações do Prisma**

```bash
npx prisma migrate dev
```

5. **Inicie o Servidor de Desenvolvimento**

```bash
npm run dev
```

Após seguir esses passos, seu projeto estará em execução e você poderá acessá-lo em http://localhost:5000 (ou outra porta, dependendo da configuração).

## Observações

Certifique-se de ter o Node.js e o Prisma CLI instalados globalmente ou localmente no projeto para poder executar os comandos mencionados acima.
