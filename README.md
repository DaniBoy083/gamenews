# GameNews

Fórum de games para gamers, desenvolvido com Next.js App Router, React e Tailwind CSS.

## Visão Geral

O projeto inclui:

- Layout global com Header e Footer.
- Home com destaque dinâmico de um jogo consumido da API `game_day`.
- Revalidação automática da sugestão em destaque a cada 320 segundos.
- Loading skeleton para a home durante o carregamento dos dados.
- Rotas iniciais prontas para Games e Perfil.
- Metadata global para SEO em português do Brasil.
- Favicon configurado a partir de `public/assets/favicon.png`.
- Configuração de imagens remotas para a API de capas externas.
- Arquivo `vercel.json` configurado para deploy na Vercel.

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## Estrutura Principal

- `src/app/layout.tsx`: layout raiz da aplicação.
- `src/app/page.tsx`: home com sugestão em destaque vinda da API.
- `src/app/loading.tsx`: skeleton de carregamento da home.
- `src/app/games/page.tsx`: rota Games.
- `src/app/perfil/page.tsx`: rota Perfil.
- `src/components/Header.tsx`: cabeçalho global.
- `src/components/Footer.tsx`: rodapé global.
- `next.config.ts`: configuração do Next.js, incluindo imagens remotas.
- `public/assets/favicon.png`: favicon do projeto.
- `vercel.json`: configuração de deploy para Vercel.

## Integração com API

A home consome a API abaixo no servidor:

- `https://sujeitoprogramador.com/next-api/?api=game_day`

O `fetch` usa cache com revalidação de `320` segundos. Isso significa que a vitrine principal pode ser atualizada periodicamente sem precisar rebuildar a aplicação.

## Como Rodar Localmente

1. Instale as dependências:

```bash
npm install
```

2. Rode o servidor de desenvolvimento:

```bash
npm run dev
```

3. Acesse no navegador:

```text
http://localhost:3000
```

## Rotas Disponíveis

- `/`
- `/games`
- `/perfil`

## Scripts

- `npm run dev`: inicia o ambiente de desenvolvimento.
- `npm run build`: gera o build de produção.
- `npm run start`: inicia a aplicação em modo de produção.
- `npm run lint`: executa a validação com ESLint.

## Deploy na Vercel

Este projeto já está preparado para deploy com Vercel.

1. Conecte o repositório na Vercel.
2. Mantenha as configurações padrão para Next.js.
3. Faça o deploy.

Configuração usada:

- framework: `nextjs`
- arquivo: `vercel.json`

## Objetivo do Projeto

Criar uma base sólida para um portal gamer, com estrutura reutilizável de layout e navegação pronta para crescer com novas features, como autenticação, publicação de conteúdo e perfis de usuário.
