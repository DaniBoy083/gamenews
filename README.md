# GameNews

Forum de games para gamers, desenvolvido com Next.js (App Router), React e Tailwind CSS.

## Visao Geral

O projeto ja inclui:

- Layout global com Header e Footer.
- Header com logo GameNews, navegacao para Games e Perfil, e icone de usuario (Material UI).
- Rotas iniciais prontas para Games e Perfil.
- Metadata global para SEO (title, description, keywords, robots).
- Favicon configurado a partir de public/assets/favicon.png.
- Arquivo vercel.json configurado para deploy na Vercel.

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Material UI (MUI)

## Estrutura Principal

- src/app/layout.tsx: Layout raiz da aplicacao.
- src/components/Header.tsx: Cabecalho global.
- src/components/Footer.tsx: Rodape global.
- src/app/page.tsx: Pagina inicial.
- src/app/games/page.tsx: Rota Games.
- src/app/perfil/page.tsx: Rota Perfil.
- public/assets/favicon.png: Favicon do projeto.
- vercel.json: Configuracao de deploy para Vercel.

## Como Rodar Localmente

1. Instale as dependencias:

npm install

2. Rode o servidor de desenvolvimento:

npm run dev

3. Acesse no navegador:

http://localhost:3000

## Rotas Disponiveis

- /
- /games
- /perfil

## Scripts

- npm run dev: inicia ambiente de desenvolvimento.
- npm run build: gera build de producao.
- npm run start: inicia aplicacao em modo producao.
- npm run lint: executa validacao de lint.

## Deploy na Vercel

Este projeto ja esta preparado para deploy com Vercel.

1. Conecte o repositorio na Vercel.
2. Mantenha as configuracoes padrao para Next.js.
3. Faça o deploy.

Configuracao usada:

- framework: nextjs
- arquivo: vercel.json

## Objetivo do Projeto

Criar uma base solida para um portal/forum gamer, com estrutura reutilizavel de layout e navegacao pronta para crescimento de features, como autenticacao, publicacao de conteudo e perfis de usuario.
