# QuE IssO

SPA de e-commerce fictício para cafeteria, feita com React, TypeScript e Vite como projeto final da disciplina SPA.

O cliente escolhe cafés no catálogo, ajusta quantidades, revisa o carrinho, informa o endereço (com consulta obrigatória ao **ViaCEP**), escolhe uma forma de pagamento fictícia e vê a confirmação do pedido.

> Não há backend, autenticação, banco de dados próprio nem cobrança real. Os dados ficam apenas no navegador.

A especificação (PRD, TECH, TASKS e registro de uso de IA) está em [que-isso-spec/](./que-isso-spec/).

## Requisitos

- Node.js **20.19+ ou 22.12+** recomendado
- npm 10+

## Instalação e execução

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Script | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (Vite) |
| `npm run build` | Typecheck (`tsc -b`) + build de produção em `dist/` |
| `npm run preview` | Serve o build local |
| `npm run lint` | oxlint |
| `npm run typecheck` | TypeScript sem emitir arquivos |
| `npm test` | Testes (Vitest + React Testing Library) |
| `npm run test:watch` | Testes em modo watch |
| `npm run test:coverage` | Testes com relatório de cobertura (v8) |

Resultado na última execução: **262 testes passando**, cobertura de 96.59% statements / 91.57% branches, lint e typecheck sem erros.

## Stack (versões efetivas)

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 19.3.1 | UI |
| Vite | 8.3.x | Dev server e build |
| TypeScript | 7.0.2 (`strict`) | Tipagem |
| React Router | 7.18.5 | Rotas `/`, `/checkout`, `/success` |
| styled-components | 6.6.0 | Estilos e temas |
| React Hook Form + @hookform/resolvers | 7.92.0 / 7.0.7 | Formulário de checkout |
| Zod | 4.6.7 | Validação do checkout |
| Vitest + Testing Library | 4.1.12 / 16.3.3 | Testes |
| jsdom | 26.1.0 | Ambiente de testes |
| axe-core | 4.14.1 | Testes automáticos de acessibilidade |

## Fluxo do produto

```
Home (catálogo) ──adicionar──▶ Carrinho (Context + useReducer) ──▶ Checkout
                                                                     │  CEP → ViaCEP
                                                                     │  Pagamento
                                                                     ▼
                       snapshot do pedido salvo → carrinho limpo → Success
```

## Arquitetura

```
src/
├── assets/          logos, favicon e ilustrações PNG locais
├── components/      UI reutilizável (Header, CoffeeCard, CartItem, DeliveryAddressForm…)
├── config/          constantes de domínio (taxa de entrega, limites, chaves de storage)
├── contexts/        CartContext (useReducer) e ThemeContext
├── data/            catálogo local tipado
├── hooks/           useCart, useTheme, useLocalStorage, useCepLookup
├── pages/           Home, Checkout, Success
├── reducers/        cartReducer (puro e imutável)
├── routes/          rotas e caminhos
├── schemas/         schema Zod do checkout
├── services/cep/    integração isolada com o ViaCEP
├── styles/          tokens, temas claro/escuro, estilos globais
├── types/           contratos de domínio
├── utils/           cálculos em centavos, moeda, CEP, pedido, storage
└── tests/           setup, helpers, testes de fluxo e acessibilidade
```

Principais decisões:

- **Carrinho:** o estado guarda só `{ coffeeId, quantity }`. Totais são derivados (`getCartTotals`) e nunca armazenados. O reducer é puro: persistência e IDs ficam fora dele.
- **Dinheiro:** tudo em centavos inteiros; formatação com `Intl.NumberFormat('pt-BR', BRL)`. Taxa fixa de R$ 5,00 em `src/config/constants.ts`.
- **Persistência:** chaves versionadas (`que-isso:cart:v1`, `que-isso:theme:v1`, `que-isso:last-order:v1`). Todo dado lido do storage passa por um parser; JSON inválido ou formato antigo vira estado vazio.
- **ViaCEP:** consulta automática quando o CEP tem 8 dígitos, mais um botão "Buscar CEP" para nova tentativa. Trata CEP inválido, não encontrado, resposta parcial, erro de rede/HTTP/JSON, cancela consultas antigas (`AbortController`) e mantém cache. Número e complemento nunca são sobrescritos.
- **Pedido:** ao confirmar, a ordem é: criar snapshot imutável → salvar → limpar carrinho → navegar. Se não conseguir salvar, o carrinho é mantido.
- **Tema:** claro/escuro com os mesmos tokens semânticos; preferência salva, com fallback para a preferência do sistema.

## Acessibilidade e responsividade

- Skip link, um `h1` por página, foco visível, labels em todos os campos, erros associados via `aria-describedby`, rádios nativos no pagamento, estados indicados com ícone + texto (não só cor).
- Contraste AA verificado por teste (`themes.test.ts`) e por axe-core: **0 violações** nas três telas, nos dois temas.
- Sem rolagem horizontal de 320px a 1280px.

## Privacidade

O endereço digitado é usado apenas para consultar o ViaCEP (somente o CEP é enviado) e fica salvo no `localStorage` do próprio navegador como parte do último pedido. Nenhum dado é enviado a servidor próprio.

## Branding com IA

- **Nome da marca:** QuE IssO
- **Conceito:** xícara de café cujo vapor forma um pin de localização: café quentinho entregue onde você estiver.
- **Ferramenta de IA utilizada:** Claude Code (modelo Claude Opus 5.5), gerando SVG vetorial.
- **Prompt utilizado:** "Crie uma logo SVG original e simples para a cafeteria QuE IssO: uma xícara amarela (#DBAC2C) sobre um pires roxo, cujo vapor forma um pin de localização roxo (#8047F8). Deve funcionar em 16px e ter variação para fundo escuro."
- **Proposta escolhida:** símbolo de xícara + pin de localização, com o nome em Baloo 2 ao lado. No Header o texto aparece como **QuE IssO** com **Delivery** logo abaixo.
- **Justificativa da escolha:** comunica café e entrega em um único ícone, é legível em tamanho pequeno e, por ser vetorial, não perde qualidade. *(Escolha feita pela IA; pendente de aprovação do estudante. Ver `que-isso-spec/docs/AI_USAGE.md`.)*
- **Paleta de cores:** amarelo `#DBAC2C` / `#C47F17` / `#F1E9C9` e roxo `#8047F8` / `#4B2995` / `#EBE5F9` no tema claro; o tema escuro usa variações mais claras (`#E5B94A`, `#A98BFA`, `#C9B8FD`) sobre fundo `#15121B`. Tokens em `src/styles/themes.ts`.
- **Tipografia:** Baloo 2 (títulos) e Roboto (textos), via Google Fonts.
- **Variações para fundo claro/escuro:** `src/assets/Log/logo-light.svg` e `src/assets/Log/logo-dark.svg`; o Header troca a logo conforme o tema.
- **Arquivos da logo e favicon:** `src/assets/Log/logo-light.svg`, `src/assets/Log/logo-dark.svg` e `public/favicon.svg` (o favicon troca de cores com `prefers-color-scheme`).
- **Verificação de legibilidade e direitos de uso:** formas simples e sem texto interno, legíveis a 16px no favicon e a 40px no Header. É um SVG original escrito para o projeto, sem uso de imagens de terceiros. As ilustrações dos cafés são PNGs originais do projeto, preservados em `src/assets/img/`.

## Uso de IA no desenvolvimento

Todas as interações estão registradas em [que-isso-spec/docs/AI_USAGE.md](./que-isso-spec/docs/AI_USAGE.md), incluindo as decisões que ainda aguardam revisão do estudante.

## Limitações conhecidas

- O Figma de referência não foi inspecionado diretamente: layout, medidas e breakpoints seguem a descrição textual da spec (DP-07).
- O bundle é um único chunk (~147 kB gzip); code-splitting por rota é uma melhoria possível.
- Deploy: ver seção abaixo.

## Deploy

O projeto é uma SPA estática. Os arquivos `vercel.json` e `public/_redirects` (Netlify) redirecionam todas as rotas para `index.html`, para que `/checkout` e `/success` funcionem ao recarregar a página.

**URL publicada:** _ainda não publicada_ (ver T-047 no TASKS_SPEC). Nenhum push ou publicação foi realizado sem autorização.
