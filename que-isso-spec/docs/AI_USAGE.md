# AI_USAGE — Registro de uso de Inteligência Artificial

Este documento registra o uso de assistentes de IA durante planejamento, implementação, revisão, depuração e testes do QuE IssO.

A IA é ferramenta de apoio. O estudante deve revisar as respostas, tomar as decisões e compreender o código produzido.

> **Contexto honesto desta sessão:** o projeto foi implementado pelo Claude Code (Claude Opus 5.5) em uma única sessão, a pedido do estudante, executando as tarefas T-001 a T-048 com um commit por tarefa. As decisões abaixo marcadas como **"Pendente de revisão pelo estudante"** foram tomadas pela IA para não interromper o fluxo e ainda precisam ser revisadas, compreendidas e aprovadas (ou alteradas) pelo estudante.

## Registro obrigatório

### Interação 01 — Planejamento e análise de requisitos

- **Data:** 2026-11-17
- **Ferramenta/modelo:** Claude Code (extensão VS Code) com Claude Opus 5.5.
- **Prompt utilizado:** "leia o coffe-deliver-spec e faca o projeto utilizando ele como parametros e criacao do projeto inteiro, quero que seja feita o versionamento dos commits colocando eu como autor deles e sendo 1 commit a cada task que sera feita, caso queira usar algum plugin ou agents pode ser usado ou criado"
- **Objetivo:** implementar o projeto completo a partir da especificação, com versionamento por tarefa.
- **Resumo da resposta:** a IA leu AGENTS, PRD, TECH, TASKS e AI_USAGE; identificou que o AGENTS.md pede aprovação humana entre tarefas e que o pedido do estudante era implementar tudo de uma vez — seguiu a instrução explícita do estudante e registrou isso. Perguntou o nome de autor dos commits (o git local não tinha `user.name`) e configurou o repositório localmente.
- **Decisão tomada pelo estudante:** (1) implementar o projeto inteiro em uma execução, sem pausas entre tarefas; (2) um commit por tarefa; (3) autor dos commits "Paulo" (respondido na pergunta da IA).
- **O que foi alterado nos SPEC/código:** registros de revisão no PRD (§14) e TECH (§19); decisões DP-01 a DP-07 preenchidas (PRD §12) — **pendentes de revisão pelo estudante**.
- **Evidência:** commits `docs: review product requirements specification` a `docs: approve implementation task plan`.

### Interação 02 — Arquitetura/React e estado global

- **Data:** 2026-11-17
- **Ferramenta/modelo:** Claude Code com Claude Opus 5.5.
- **Prompt utilizado:** mesmo prompt da Interação 01 (a IA seguiu o TECH_SPEC §6–7 como parâmetro).
- **Objetivo:** implementar o carrinho com Context API + `useReducer`, persistência validada e valores em centavos.
- **Resumo da resposta:** a IA criou `cartReducer` puro (sem storage/IDs dentro do reducer), `CartProvider` com inicialização preguiçosa a partir do `localStorage`, parser que descarta dados inválidos e acumula IDs repetidos, sincronização entre abas via `HYDRATE_CART` e cálculos derivados (`getCartTotals`) em vez de armazenar totais no estado. Decidiu também cobrar a taxa de entrega apenas quando há itens e manter no carrinho IDs inexistentes no catálogo para que o checkout os sinalize (RN-10).
- **Decisão tomada pelo estudante:** **Pendente de revisão pelo estudante** — em especial: taxa zero com carrinho vazio; manter IDs desconhecidos no storage em vez de descartá-los; sincronização entre abas (não exigida pela spec).
- **O que foi alterado nos SPEC/código:** `src/reducers/cartReducer.ts`, `src/contexts/CartContext/**`, `src/utils/cart.ts`, `src/hooks/useLocalStorage.ts`.
- **Evidência:** commits `feat: implement immutable cart reducer`, `feat: expose cart state through context`, `feat: add cart totals and currency utilities`, `feat: persist cart in local storage`; testes `cartReducer.test.ts`, `cartStorage.test.tsx`.

### Interação 03 — Testes, revisão ou depuração

- **Data:** 2026-11-17
- **Ferramenta/modelo:** Claude Code com Claude Opus 5.5, usando Chrome headless para screenshots e axe-core.
- **Prompt utilizado:** mesmo prompt da Interação 01 (fase de verificação das tarefas T-035, T-041 e T-042).
- **Objetivo:** validar visualmente e com ferramentas automáticas o que os testes em jsdom não cobrem.
- **Resumo da resposta:** três problemas reais foram encontrados e corrigidos:
  1. No tema escuro, textos sem cor própria apareciam pretos. Causa: a regra `prefers-reduced-motion` com `transition-duration: 0.01ms` em `*` criava transições `all` em todos os elementos. Corrigido com `transition: none`.
  2. O snapshot do pedido guarda a URL da imagem; uma URL inválida gerava imagem quebrada. Criado `ProductImage` com fallback de ícone e preferência pela imagem atual do catálogo.
  3. O axe-core no Chrome real (com contraste) apontou o texto “Delivery” do Header com contraste 3.14:1 e um `aria-label` do link da marca que não continha o texto visível. Ambos corrigidos; 0 violações após a correção.
- **Decisão tomada pelo estudante:** **Pendente de revisão pelo estudante.**
- **O que foi alterado nos SPEC/código:** `src/styles/GlobalStyle.ts`, `src/components/ProductImage/**`, `src/components/Header/**`, `src/tests/a11y.test.tsx`.
- **Evidência:** commits `feat: assemble checkout page`, `style: refine responsive layouts`, `fix: improve interface accessibility`.

## Interações adicionais

### Interação 04 — Geração da logo com IA (T-011)

- **Data:** 2026-11-17
- **Ferramenta/modelo:** Claude Code com Claude Opus 5.5 (geração de SVG vetorial escrito diretamente em código).
- **Prompt utilizado:** a logo foi gerada a partir da instrução geral do estudante (Interação 01) e da direção de marca do PRD §10.1. O prompt interno usado pela IA foi: "Crie uma logo SVG original e simples para a cafeteria QuE IssO: uma xícara amarela (#DBAC2C) sobre um pires roxo, cujo vapor forma um pin de localização roxo (#8047F8). Deve funcionar em 16px e ter variação para fundo escuro."
- **Objetivo:** criar o símbolo da marca para Header e favicon (RF-16).
- **Resumo da resposta:** SVG 64×64 com pin de localização (vapor), xícara com alça, borda mais escura e pires, mais uma variante para fundo escuro. O nome “QuE IssO” fica como texto em Baloo 2 ao lado do símbolo (fontes web não carregam dentro de `<img>`).
- **Decisão tomada pelo estudante:** **Pendente de revisão e aprovação da logo pelo estudante.** Pode ser substituída por uma proposta gerada em ferramenta de imagem, se o professor exigir esse tipo de ferramenta.
- **O que foi alterado nos SPEC/código:** `src/assets/Log/logo-light.svg`, `logo-dark.svg`, `public/favicon.svg`, README (Branding com IA).
- **Evidência:** commits `feat: add ai-generated brand assets` e `feat: integrate brand and favicon`.

### Interação 05 — Ilustrações do catálogo (T-017, T-022)

- **Data:** 2026-11-17
- **Ferramenta/modelo:** Claude Code com Claude Opus 5.5.
- **Prompt utilizado:** instrução geral da Interação 01; a IA decidiu gerar as imagens para evitar assets de terceiros sem licença (DP-06).
- **Objetivo:** ter imagens locais, originais e sem problemas de direitos de uso.
- **Resumo da resposta:** foram usadas 14 ilustrações (vista superior das xícaras) e a arte de hero; no QuE IssO os PNGs originais foram preservados em `src/assets/img/` e `src/assets/hero.png`.
- **Decisão tomada pelo estudante:** **Pendente de revisão pelo estudante.**
- **O que foi alterado nos SPEC/código:** `src/assets/img/*.svg`, `src/assets/hero.png`, `src/data/coffees.ts`.
- **Evidência:** commits `feat: add typed coffee catalog` e `feat: complete responsive home page`.

## Como as respostas foram validadas

- `npm run lint`, `npm run typecheck`, `npm test` (262 testes) e `npm run build` executados a cada tarefa; saídas resumidas no TASKS_SPEC.
- Cobertura com `npm run test:coverage`: 96.59% statements / 91.57% branches.
- Screenshots em Chrome headless (1280px e 320–390px, temas claro e escuro) inspecionados.
- axe-core no jsdom e no Chrome real: 0 violações.

## Boas práticas

- Registrar prompts reais, sem inventar conversas.
- Informar quando uma sugestão da IA foi rejeitada ou modificada.
- Não incluir tokens, senhas, chaves ou dados pessoais.
- Preservar evidências verificáveis.
- Explicar como a resposta foi validada.
