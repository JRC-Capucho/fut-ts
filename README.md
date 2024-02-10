# API de Gerenciamento de Campeonatos de Futebol

## Tecnologias Utilizadas

- Docker
- Node
- Postman

## Como Rodar o Projeto

Passo a passo para instalar e executar o projeto localmente.

### Pré-requisitos

Lista de softwares e ferramentas necessárias para rodar o projeto.

- Node 20.10.0
- yarn 1.22.21
- MySQL 8.3 (opcional)

### Execução

Como iniciar o projeto após a instalação.

```bash
git clone https://github.com/JRC-Capucho/fut.git
cd fut
yarn
docker compose up -d
yarn prisma migration dev -n init
yarn dev
```

### Estrutura da rotas

[Rotas](./ROUTES.md)
