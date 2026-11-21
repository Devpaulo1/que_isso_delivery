# AGENTS.md — QuE IssO

> Instruções obrigatórias para qualquer assistente de IA ou agente de codificação que trabalhe neste repositório.
> Este é o **único** `AGENTS.md` do projeto: ele substitui o antigo `docs/AI_USAGE.md` e concentra as regras de atuação **e** o registro de uso de IA.

## 1. Papel e meta

Você é um mentor/desenvolvedor front-end especializado em **React** e **TypeScript**, responsável pelo projeto **QuE IssO** (projeto final da disciplina SPA).

**Meta:** desenvolver e manter uma aplicação completa de cafeteria — catálogo, carrinho, checkout e confirmação — em React + TypeScript, com identidade visual própria (logo criada com IA), tema claro/escuro, responsividade mobile, especificações de produto e técnicas, testes e uso documentado de IA. Código limpo, componentizado, tipado e de fácil leitura.

O produto não possui backend, autenticação, banco de dados próprio nem processamento financeiro real.

## 2. Contexto e fontes de verdade

- **Figma** — Entrega de café | Projeto Final React (arquivo fornecido pelo professor): Home (frame `2:1550`), Checkout (frame `217:511`), Confirmação (frame `222:824`). Há também Home, Checkout obrigatório, tela de sucesso e Guia de Estilo. Identidade de referência: amarelo e roxo, tipografias **Baloo 2** (títulos) e **Roboto** (textos). A marca pode ser personalizada; no QuE IssO o nome ao lado da logo é **QuE IssO**, com **Delivery** logo abaixo.
  https://www.figma.com/design/yGPNTA0Yczb183EikXGIiA/Coffee-Delivery-%E2%80%A2-Projeto-Final-React?node-id=217-511&t=ojymzxreqtuCt0uo-0
- **Notion (SPEC original):** `[Projeto Final 05] Entrega de Café — React + TypeScript + IA`.
- **Documentação do projeto:** `docs/PRD_SPEC.md`, `docs/TECH_SPEC.md`, `docs/TASKS_SPEC.md`, `README.md` e este `AGENTS.md`.

Antes de planejar, editar ou criar código, leia integralmente:

1. `AGENTS.md`;
2. `docs/PRD_SPEC.md`;
3. `docs/TECH_SPEC.md`;
4. `docs/TASKS_SPEC.md`;
5. `README.md`, se já existir.

Precedência:

- `PRD_SPEC.md` define **o que** o produto faz e seus critérios de aceite (RF-01..RF-16, RN-01..RN-10).
- `TECH_SPEC.md` define **como** a solução é estruturada.
- `TASKS_SPEC.md` define a sequência de execução e o estado do trabalho.
- `AGENTS.md` define **como o agente deve atuar**.
- Em caso de conflito, não escolha silenciosamente: interrompa a tarefa, descreva o conflito e solicite decisão humana.
- Não invente detalhes visuais que não tenham sido inspecionados. Se o Figma estiver inacessível, registre a limitação e peça exportações ou descrição antes de afirmar medidas, espaçamentos ou estados específicos.
- Não trate sugestão de IA como decisão aprovada.

## 3. Eixos transversais

- React + Vite + TypeScript (modo estrito).
- React Router (`/`, `/checkout`, `/success`).
- Context API + `useReducer` para o carrinho; `useState` e Hooks personalizados onde fizer sentido.
- `localStorage` versionado para carrinho, tema, último pedido e idioma.
- React Hook Form + Zod para formulário e validação.
- styled-components para estilos e tokens de tema.
- Vitest + React Testing Library; Playwright é opcional.
- i18next / react-i18next para português, inglês e espanhol.
- Git e GitHub, com commits semânticos por tarefa.
- ViaCEP para consulta pública de CEP no checkout.

## 4. Escopo funcional (resumo)

- Catálogo de cafés com imagem, nome, descrição, preço e categoria/tag.
- Seleção de quantidade e adição ao carrinho, acumulando o mesmo produto.
- Edição do carrinho (aumentar, diminuir, remover) e badge com a soma das unidades.
- Persistência do carrinho em `localStorage`, com validação dos dados lidos.
- Checkout com endereço (consulta obrigatória a API pública de CEP), forma de pagamento e resumo financeiro.
- Confirmação fictícia instantânea e limpeza segura do carrinho.
- Tema claro/escuro persistido, layout responsivo, acessibilidade e logo original integrada ao Header e ao favicon.
- Seletor de idioma com preferência persistida e `document.documentElement.lang` sincronizado.

Detalhes e critérios: `docs/PRD_SPEC.md` (RF-01..RF-16, RN-01..RN-10).

## 5. Regras de código e arquitetura

- Componentes pequenos, com uma única responsabilidade.
- Dados passados por **Props** — nada de valores duplicados dentro dos componentes.
- Estado do carrinho via Context API + `useReducer`; tema e idioma via Hooks/Contexto; persistência com `localStorage`.
- Listas renderizadas com `map()` e `key` estável.
- HTML semântico (`header`, `main`, `nav`, `footer`, `button`, `a`).
- Layout responsivo (mobile-first), fiel aos espaçamentos e à tipografia da referência.
- Código legível, nomes claros, sem abstrações desnecessárias.
- Classes/estilos organizados; evite estilos repetidos em linha.
- Acessibilidade: `alt` em imagens, `aria-label` em botões de ícone, foco visível, navegação por teclado e contraste WCAG 2.2 AA.
- Não usar `any` como atalho; não concentrar regras no `App.tsx`.
- Métodos de arrays com imutabilidade (`map`, `filter`, `find`, `reduce`); nunca mutar estado diretamente.
- Preços em centavos inteiros; formatação BRL com duas casas decimais.
- Centralizar taxa de entrega, limites, chaves de storage e tokens de tema; não espalhar valores mágicos.
- Manter o reducer puro: persistência, IDs e efeitos ficam fora dele.
- Não instalar dependências sem necessidade real e justificativa documentada.
- Não criar backend, autenticação, pagamento real ou funcionalidades fora do escopo.
- Explicar oralmente o fluxo do estado global (Contexto + reducer) e os principais trechos. Código que o estudante não consegue explicar não demonstra domínio.

## 6. Estrutura sugerida

Ver `docs/TECH_SPEC.md`, seção 3 (orientativa, não obrigatória).

## 7. Fluxo de trabalho

1. Leia os SPECs (`PRD_SPEC.md`, `TECH_SPEC.md`, `TASKS_SPEC.md`) e este `AGENTS.md` antes de escrever código.
2. Planeje uma tarefa e explique o que será feito antes de codificar.
3. Implemente uma tarefa por vez (`TASKS_SPEC.md`), pequena e verificável.
4. Teste no navegador (desktop e mobile) e verifique console/erros.
5. Corrija o que divergir do Figma/SPEC e explique o que mudou e como testar.
6. Antes de concluir: rodar testes relacionados, lint, typecheck e build quando pertinente; registrar comandos e resultados reais.
7. Ao finalizar cada tarefa: marcar checklist, registrar teste/evidência e criar commit semântico.
8. Atualizar a documentação quando uma decisão aprovada mudar.

Não implemente toda a aplicação em uma única solicitação. Não avance automaticamente para a próxima tarefa sem apresentar o resultado da atual e aguardar orientação.

## 8. Prompt inicial sugerido

> Atue como mentor de React e TypeScript neste projeto final QuE IssO. Leia `PRD_SPEC.md`, `TECH_SPEC.md`, `TASKS_SPEC.md`, `AGENTS.md` e o Figma. Identifique requisitos, dependências, componentes e riscos. Proponha apenas a próxima tarefa pequena, com critérios de aceite e um plano de testes. Não implemente toda a aplicação de uma vez. Explique as decisões e peça para eu validar o resultado antes de avançar.

## 9. Ferramentas

- **Context7 MCP:** consultar documentação de React, TypeScript, React Router, React Hook Form, Zod e styled-components antes de implementar.
- **Playwright MCP:** abrir a aplicação local, testar fluxos, links e validar desktop/mobile.
- **Figma:** consultar diretamente as telas; se houver Figma MCP disponível, use-o para obter medidas e tokens.
- **IA:** usar para planejar, explicar, verificar, depurar e testar. Registre pelo menos três interações relevantes na seção 13 deste arquivo.

## 10. Guarda-corpos

- Explique as mudanças de forma objetiva, comparando arquivos alterados e indicando como testar.
- Não adicionar bibliotecas sem necessidade real; justifique qualquer dependência nova.
- Não invente elementos ausentes do Figma (textos, botões, ícones).
- Utilize os ativos fornecidos/criados (logo e PNGs locais) em vez de substitutos.
- Não crie subagentes, arquivos em `.opencode/agents/` nem Skills próprios: este único `AGENTS.md` define o comportamento do agente.
- Não quebre o que já funciona: mudanças pequenas e verificáveis.
- Não reescrever histórico Git, descartar alterações do usuário nem publicar sem autorização.
- Nunca inventar resultados de testes, cobertura, screenshots, deploy ou commits.

## 11. Padrão de commits

`feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `style:` e `chore:` — um commit semântico por tarefa concluída.

## 12. Critérios de aceite (Definition of Done)

- Interface visualmente fiel à referência em desktop e mobile.
- Alternância de tema funcionando e persistindo após recarregar a página.
- Links externos abrindo corretamente (quando aplicável).
- Componentes reutilizáveis alimentados por Props.
- Uso de `useState`, eventos e `map()` conforme o escopo.
- Sem erros no console e layout estável nas larguras de referência.
- Fluxo Home → Checkout → Sucesso sem regressão.
- Testes relevantes passando; TypeScript e lint sem erros.
- Estados de loading, erro e vazio considerados quando aplicável.
- Acessibilidade e responsividade verificadas.
- Documentos `PRD_SPEC.md`, `TECH_SPEC.md`, `TASKS_SPEC.md` e `AGENTS.md` versionados.
- Uso de IA documentado com pelo menos três evidências (seção 13).
- Evidências de testes disponíveis; publicação apenas após autorização.

## 13. Registro de uso de IA

Este documento registra o uso de assistentes de IA durante planejamento, implementação, revisão, depuração e testes do QuE IssO. A IA é ferramenta de apoio: o estudante deve revisar as respostas, tomar as decisões e compreender o código produzido.

> **Contexto honesto:** o projeto foi implementado em uma única sessão, a pedido do estudante, executando T-001 a T-048, a etapa final de internacionalização e a sinalização de localização no Header, com um commit por tarefa. As decisões marcadas como **pendentes de revisão** foram tomadas para não interromper o fluxo e ainda precisam ser revisadas, compreendidas e aprovadas (ou alteradas) pelo estudante.

### Interação 01 — Planejamento e análise de requisitos

- **Data:** 2026-11-17
- **Ferramenta:** assistente de IA do ambiente de desenvolvimento.
- **Prompt utilizado:** "leia o que-isso-spec e faca o projeto utilizando ele como parametros e criacao do projeto inteiro, quero que seja feita o versionamento dos commits colocando eu como autor deles e sendo 1 commit a cada task que sera feita, caso queira usar algum plugin ou agents pode ser usado ou criado".
- **Objetivo:** implementar o projeto completo a partir da especificação, com versionamento por tarefa.
- **Resumo da resposta:** leu `AGENTS.md`, PRD, TECH, TASKS e registro de IA; identificou que as regras pedem aprovação humana entre tarefas e que o pedido era implementar tudo de uma vez — seguiu a instrução explícita e registrou isso. Perguntou o autor dos commits (o git local não tinha `user.name`) e configurou o repositório localmente.
- **Decisão tomada pelo estudante:** (1) implementar o projeto inteiro em uma execução, sem pausas entre tarefas; (2) um commit por tarefa; (3) autor dos commits "Paulo".
- **O que foi alterado nos SPECs/código:** registros de revisão no PRD e TECH; decisões DP-01 a DP-07 preenchidas — **pendentes de revisão pelo estudante**.
- **Evidência:** `docs: registrar especificação de produto do QuE IssO` até `docs: aprovar plano de implementação por tarefas`.

### Interação 02 — Arquitetura/React e estado global

- **Data:** 2026-11-17
- **Ferramenta:** assistente de IA do ambiente de desenvolvimento.
- **Prompt utilizado:** mesmo prompt da Interação 01, com `TECH_SPEC.md` §6–7 como parâmetro.
- **Objetivo:** implementar o carrinho com Context API + `useReducer`, persistência validada e valores em centavos.
- **Resumo da resposta:** criou `cartReducer` puro (sem storage/IDs dentro do reducer), `CartProvider` com inicialização preguiçosa a partir do `localStorage`, parser que descarta dados inválidos e acumula IDs repetidos, sincronização entre abas e cálculos derivados (`getCartTotals`) em vez de armazenar totais no estado. A taxa de entrega é cobrada apenas com itens e IDs desconhecidos são sinalizados no checkout.
- **Decisão tomada pelo estudante:** **pendente de revisão** — em especial: taxa zero com carrinho vazio, manter IDs desconhecidos no storage e sincronização entre abas.
- **Arquivos:** `src/reducers/cartReducer.ts`, `src/contexts/CartContext/**`, `src/utils/cart.ts`, `src/hooks/useLocalStorage.ts`.
- **Evidência:** `feat: implementar reducer imutavel do carrinho`, `feat: expor estado do carrinho por contexto`, `feat: adicionar totais do carrinho e utilitarios`, `feat: persistir carrinho no localStorage`; testes `cartReducer.test.ts` e `cartStorage.test.tsx`.

### Interação 03 — Testes, revisão e depuração

- **Data:** 2026-11-17
- **Ferramenta:** assistente de IA do ambiente de desenvolvimento, com testes automatizados e axe-core.
- **Prompt utilizado:** mesmo prompt da Interação 01, fase de verificação das tarefas T-035, T-041 e T-042.
- **Objetivo:** validar o que testes em jsdom não cobrem, incluindo contraste e navegação.
- **Resumo da resposta:** três problemas reais encontrados e corrigidos:
  1. No tema escuro, textos sem cor própria apareciam pretos; a causa era `transition: all` com duração mínima em `*` via `prefers-reduced-motion`. Corrigido com `transition: none`.
  2. O snapshot do pedido guarda a URL da imagem; uma URL inválida gerava imagem quebrada. Criado fallback de imagem com preferência pelo asset atual do catálogo.
  3. axe-core apontou contraste insuficiente no texto "Delivery" do Header e `aria-label` da marca sem o texto visível. Ambos corrigidos; 0 violações após a correção.
- **Decisão tomada pelo estudante:** **pendente de revisão**.
- **Arquivos:** `src/styles/GlobalStyle.ts`, `src/components/ProductImage/**`, `src/components/Header/**`, `src/tests/a11y.test.tsx`.
- **Evidência:** `feat: montar pagina de checkout`, `style: refinar layouts responsivos`, `fix: melhorar acessibilidade da interface`.

### Interação 04 — Logo e identidade (T-011)

- **Data:** 2026-11-17
- **Ferramenta:** assistente de IA do ambiente de desenvolvimento (SVG vetorial escrito em código).
- **Prompt utilizado:** "Crie uma logo SVG original e simples para a cafeteria QuE IssO: uma xícara amarela (#DBAC2C) sobre um pires roxo, cujo vapor forma um pin de localização roxo (#8047F8). Deve funcionar em 16px e ter variação para fundo escuro."
- **Objetivo:** integrar a marca ao Header e ao favicon (RF-16), mantendo o nome **QuE IssO / Delivery**.
- **Resumo da resposta:** os SVGs originais já estavam no repositório; a etapa adaptou os títulos dos arquivos e integrou as variantes clara/escura ao Header e ao favicon, que troca de cores com `prefers-color-scheme`.
- **Decisão tomada pelo estudante:** **pendente de revisão e aprovação da logo**. Pode ser substituída se o professor exigir ferramenta de imagem específica.
- **Arquivos:** `src/assets/Log/logo-light.svg`, `src/assets/Log/logo-dark.svg`, `public/favicon.svg`, `README.md` (Branding com IA).
- **Evidência:** `feat: integrar assets de marca existentes`.

### Interação 05 — Ilustrações do catálogo (T-017, T-022)

- **Data:** 2026-11-17
- **Ferramenta:** assistente de IA do ambiente de desenvolvimento.
- **Prompt utilizado:** instrução geral da Interação 01; priorizar assets locais e originais para evitar dependência de terceiros sem licença (DP-06).
- **Objetivo:** manter imagens locais, originais e sem problemas de direitos de uso.
- **Resumo da resposta:** foram preservadas as 14 ilustrações de xícaras e a arte de hero em PNG, em `src/assets/img/` e `src/assets/hero.png`, sem substituir os arquivos do projeto.
- **Decisão tomada pelo estudante:** **pendente de revisão**.
- **Arquivos:** `src/assets/img/*.png`, `src/assets/hero.png`, `src/data/coffees.ts`.
- **Evidência:** `feat: criar catalogo tipado de cafes`, `feat: finalizar pagina home responsiva`.

### Interação 06 — Selo de localização no Header (T-059)

- **Data:** 2026-11-21
- **Ferramenta:** assistente de IA do ambiente de desenvolvimento.
- **Prompt utilizado:** "Entao finalizou tudo? Agora eu quero que vc coloquei um campo tipo se a pessoa coloca o cep, e for Sao paulo, SP aparece nesse campo do lado do idioma vou manda o svg do figma." (seguido do SVG do Figma).
- **Objetivo:** exibir, ao lado do seletor de idioma, o selo do Figma quando o CEP consultado pertencer a São Paulo/SP.
- **Resumo da resposta:** manteve pin, dimensões (143×38), cantos arredondados e cores do SVG enviado, mas substituiu o texto "Porto Alegre, RS" por "São Paulo, SP". Criou um contexto leve de localização sem persistência; o formulário de endereço sincroniza cidade/UF consultados (ou digitados) com o contexto; o Header renderiza o selo somente para São Paulo/SP, com normalização de acento e caixa. Nenhuma dependência nova foi instalada.
- **Decisão tomada pelo estudante:** **pendente de revisão** — o estudante enviou o SVG e escolheu a condição "CEP de São Paulo/SP"; a tradução do texto do selo e a não persistência da localização foram decisões da IA.
- **Arquivos:** `src/components/DeliveryLocationBadge/**`, `src/contexts/DeliveryLocationContext/**`, `src/hooks/useDeliveryLocation.ts`, `src/utils/deliveryLocation.ts`, `src/components/Header/**`, `src/components/DeliveryAddressForm/**`, `src/App.tsx`, `src/i18n/locales/{pt,en,es}.ts`, `src/tests/helpers/render.tsx`.
- **Evidência:** `feat: exibir selo de Sao Paulo no header apos consulta de cep`; testes `DeliveryLocationBadge.test.tsx`, `deliveryLocation.test.ts`, `Header.test.tsx` e `DeliveryAddressForm.test.tsx`; lint, typecheck, build e 270 testes ok.

### Interação 07 — Selo para todos os estados e alinhamento do CEP (T-060)

- **Data:** 2026-11-21
- **Ferramenta:** assistente de IA do ambiente de desenvolvimento, com verificação no navegador e DOM medido via JavaScript.
- **Prompt utilizado:** "Alinhe o botao de buscar o CEP, mais uma coisa ele so pegou o de sp, quero que pegue de todos os estados do brasil coloquei o 40301-155 ele nao apareceu nada que seria Bahia".
- **Objetivo:** corrigir o alinhamento do botão "Buscar CEP" e fazer o selo aparecer para qualquer cidade/UF, não apenas São Paulo/SP.
- **Resumo da resposta:** manteve o pin e as cores do SVG, mas trocou os rótulos fixos por interpolação de cidade/UF (`header.location`), removeu a restrição `isSaoPauloSp` e passou a renderizar o selo sempre que cidade e UF estiverem preenchidos. Um erro de tradução (`t('header.location', label)` tratava o texto como valor padrão e deixava as variáveis vazias) foi encontrado pelos testes e corrigido passando `{ city, state }`. O botão foi alinhado ao input com `margin-top` calculado a partir da linha do label e do gap do campo.
- **Decisão tomada pelo estudante:** aprovada — pedido explícito de funcionar para todos os estados, com o CEP `40301-155` (Bahia) como exemplo. A IA decidiu manter a localização sem persistência e atualizar os rótulos pt/en/es.
- **Arquivos:** `src/utils/deliveryLocation.{ts,test.ts}`, `src/components/DeliveryLocationBadge/**`, `src/components/Header/**`, `src/components/DeliveryAddressForm/**`, `src/i18n/locales/{pt,en,es}.ts`.
- **Evidência:** `fix: exibir selo para qualquer estado e alinhar busca de cep`; lint, typecheck, build e 273 testes ok; no navegador, ViaCEP real devolveu Salvador/BA para `40301155` e o selo exibiu "Entrega em Salvador, BA"; alinhamento medido com `deltaTop = 0` e `deltaBottom = 0`.

### Interação 08 — Evidências visuais e fechamento da entrega (T-061)

- **Data:** 2026-11-21
- **Ferramenta:** assistente de IA do ambiente de desenvolvimento.
- **Prompt utilizado:** "coloquei os print das evidencias e agora falta oq?" e, em seguida, "Atualiza ele e da o commit" / "pode da o push".
- **Objetivo:** conferir o checklist de entrega e fechar a documentação com as capturas fornecidas pelo estudante.
- **Resumo da resposta:** confirmou que já estavam prontos o repositório público, o push anterior e o deploy; apontou que faltavam versionar as capturas, corrigir README/TASKS e registrar T-061. A IA **não gerou as imagens**: elas foram fornecidas pelo estudante em `que-isso-spec/evidencias/`. Após autorização, atualizou os documentos, criou o commit e fez o push.
- **Decisão tomada pelo estudante:** forneceu as 8 capturas e autorizou atualização, commit e push.
- **Arquivos:** `que-isso-spec/evidencias/**`, `README.md`, `que-isso-spec/docs/TASKS_SPEC.md`, `que-isso-spec/AGENTS.md`.
- **Evidência:** `docs: adicionar evidencias visuais e url de publicacao`; 8 PNGs validados; URL publicada verificada em https://queissodelivery.vercel.app.

### Como as respostas foram validadas

- `npm run lint`, `npm run typecheck`, `npm run build` e `npm test`: ok, com **33 arquivos e 273 testes passando**.
- `npm run test:coverage`: **96,59% statements / 90,02% branches / 97,08% functions / 97,64% lines** (após T-060).
- Testes de contraste entre temas e axe-core: **0 violações**.
- Evidências visuais: **8 capturas** em `que-isso-spec/evidencias/`, fornecidas pelo estudante; deploy verificado em https://queissodelivery.vercel.app.
- Resultados resumidos em `docs/TASKS_SPEC.md`; nenhum resultado de teste, cobertura, screenshot ou deploy foi inventado.

### Boas práticas

- Registrar prompts reais, sem inventar conversas.
- Informar quando uma sugestão de IA foi rejeitada ou modificada.
- Não incluir tokens, senhas, chaves ou dados pessoais.
- Preservar evidências verificáveis.
- Explicar como a resposta foi validada.

## 14. Primeira resposta de uma sessão de implementação

Depois de ler os documentos e inspecionar o repositório, apresente:

1. resumo do estado atual;
2. requisitos e dependências da próxima tarefa;
3. proposta de uma única tarefa;
4. arquivos que serão criados/alterados;
5. critérios de aceite e plano de testes.

Aguarde aprovação antes de implementar alterações relevantes.
