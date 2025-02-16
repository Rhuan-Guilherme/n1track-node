# N1Track - Reconstrução do Sistema

## Sobre o Projeto
A reconstrução do **N1Track** tem como objetivo modernizar toda a plataforma, migrando a aplicação do backend de **PHP puro** para **Node.js** com **Fastify** e **PostgreSQL**. Com essa migração, buscamos melhorar **desempenho, funcionalidade e segurança**, além de tornar o sistema mais escalável e manutenível.

## Tecnologias Utilizadas

### Backend
- **Node.js** - Plataforma de execução JavaScript.
- **Fastify** - Framework web otimizado para alta performance.
- **PostgreSQL** - Banco de dados relacional robusto e escalável.
- **Prisma ORM** - Abstração para manipulação do banco de dados.
- **Zod** - Validação de dados e schemas.
- **JWT** - Autenticação baseada em tokens.


## Melhorias Implementadas
- **Desempenho:** Utilização do Fastify para respostas mais rápidas.
- **Segurança:** Implementação de autenticação JWT e criptografia de senhas.
- **Escalabilidade:** Uso de PostgreSQL com otimizações para alto volume de dados.
- **Código mais limpo e modular:** Separação clara de responsabilidades no projeto.

## Como Rodar o Projeto

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/n1track-backend.git
   ```
2. Acesse o diretório do projeto:
   ```sh
   cd n1track-backend
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Configure as variáveis de ambiente:
   ```sh
   cp .env.example .env
   ```
   Preencha o arquivo `.env` com as configurações corretas.
5. Inicie a aplicação:
   ```sh
   npm run dev
   ```
6. A API estará disponível em `http://localhost:3000`.

## Contribuição
Se deseja contribuir com este projeto, fique à vontade para abrir **issues** ou enviar **pull requests**.

## Licença
Este projeto está sob a licença **MIT**.

## By Rhuan Guilherme

