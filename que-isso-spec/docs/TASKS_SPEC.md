---
title: "QuE IssO — Implementation Tasks"
version: "1.0.0"
status: "Approved — in progress"
last_updated: "2026-11-17"
---

# TASKS_SPEC — Plano de implementação

## Regras de execução

- Executar uma tarefa por vez e na ordem de dependência.
- Não marcar tarefa como concluída sem evidência.
- Cada tarefa deve ser revisada pelo estudante antes de iniciar a próxima.
- Atualizar os SPEC quando uma decisão aprovada mudar.
- Registrar comando/teste e resultado real.
- Criar commit semântico após validação da tarefa.
- `[P]` indica tarefa que pode ser paralelizada, desde que suas dependências estejam concluídas e o estudante aprove.

Status possíveis: `⏳ Não iniciada`, `🚧 Em andamento`, `✅ Concluída`, `⛔ Bloqueada`.

## Fase 0 — Especificação e decisões

### T-001 — Revisar PRD
- **Objetivo:** revisar escopo, RF, RN, RNF e critérios de aceite com o estudante.
- **Requisitos:** todos.
- **Arquivos:** `docs/PRD_SPEC.md`.
- **Critério de pronto:** decisões pendentes identificadas e PRD aprovado.
- **Teste/evidência:** checklist de revisão preenchido.
- **Evidência:** checklist de revisão na seção 14 do PRD
- **Status:** ✅ Concluída.

### T-002 — Revisar arquitetura técnica
- **Objetivo:** validar stack, diretórios, tipos, estado, persistência e integração ViaCEP.
- **Requisitos:** RF-01 a RF-16.
- **Arquivos:** `docs/TECH_SPEC.md`.
- **Critério de pronto:** decisões técnicas aprovadas e rastreabilidade revisada.
- **Teste/evidência:** revisão humana do TECH_SPEC.
- **Evidência:** registro de revisão na seção 19 do TECH_SPEC
- **Status:** ✅ Concluída.

### T-003 — Aprovar decisões de produto
- **Objetivo:** confirmar marca, taxa, decremento, estilo e comportamento de consulta CEP.
- **Requisitos:** RN-01, RN-03, RN-07, RF-14, RF-16.
- **Arquivos:** `docs/PRD_SPEC.md`, `docs/TECH_SPEC.md`.
- **Critério de pronto:** DP-01 a DP-07 resolvidas ou explicitamente mantidas como pendentes.
- **Teste/evidência:** decisões registradas nos SPEC.
- **Evidência:** DP-01 a DP-07 resolvidas no PRD §12 e TECH §18
- **Status:** ✅ Concluída.

### T-004 — Aprovar plano de tarefas
- **Objetivo:** validar sequência, dependências e granularidade das tarefas.
- **Requisitos:** todos.
- **Arquivos:** `docs/TASKS_SPEC.md`.
- **Critério de pronto:** plano aprovado pelo estudante.
- **Teste/evidência:** revisão do checklist.
- **Evidência:** plano revisado; ordem T-001→T-048 mantida
- **Status:** ✅ Concluída.

## Fase 1 — Configuração do projeto

### T-005 — Criar projeto Vite React TypeScript
- **Objetivo:** inicializar SPA com TypeScript strict.
- **Requisitos:** RF-07, RNF-06.
- **Arquivos:** `package.json`, `vite.config.ts`, `tsconfig*.json`, `src/main.tsx`.
- **Critério de pronto:** aplicação inicia sem erro e TypeScript strict está habilitado.
- **Teste/evidência:** `npm run dev`, `npm run build`, `npx tsc --noEmit`.
- **Commit:** `chore: initialize vite react typescript app`.
- **Status:** ⏳ Não iniciada.

### T-006 — Configurar Git e arquivos de projeto
- **Objetivo:** configurar `.gitignore`, scripts e estrutura inicial.
- **Requisitos:** RNF-06.
- **Arquivos:** `.gitignore`, `package.json`, `README.md`.
- **Critério de pronto:** arquivos temporários e dependências não são versionados; scripts executam.
- **Teste/evidência:** `git status`, execução dos scripts disponíveis.
- **Commit:** `chore: configure project tooling`.
- **Evidência:** git status limpo; typecheck, lint e build executados sem erro
- **Status:** ✅ Concluída.

### T-007 — Instalar e configurar dependências
- **Objetivo:** instalar React Router, styled-components, RHF, Zod e ferramentas de teste.
- **Requisitos:** RF-07, RF-08, RF-14.
- **Arquivos:** `package.json`, lockfile, configuração de testes.
- **Critério de pronto:** dependências compatíveis e sem imports não resolvidos.
- **Teste/evidência:** build e teste mínimo de configuração.
- **Commit:** `chore: adicionar dependencias de aplicacao e testes`.
- **Evidência:** build ok; 1 teste de setup passou com Vitest + jsdom
- **Status:** ✅ Concluída.

### T-008 — Criar estrutura de diretórios e aliases
- **Objetivo:** organizar pastas por responsabilidade.
- **Requisitos:** RNF-06.
- **Arquivos:** `src/**`, `tsconfig*.json`, `vite.config.ts`.
- **Critério de pronto:** estrutura aprovada e imports funcionando.
- **Teste/evidência:** typecheck e build.
- **Commit:** `chore: organizar estrutura e alias da aplicacao`.
- **Evidência:** alias @/ em vite e tsconfig; typecheck, 2 testes e build ok
- **Status:** ✅ Concluída.

### T-009 — Configurar rotas básicas
- **Objetivo:** criar rotas Home, Checkout e Success com páginas provisórias.
- **Requisitos:** RF-07, RN-09, RN-10.
- **Arquivos:** `src/App.tsx`, `src/main.tsx`, `src/pages/**`.
- **Critério de pronto:** navegação entre três rotas sem reload.
- **Teste/evidência:** teste de navegação ou verificação manual.
- **Commit:** `feat: configurar rotas da aplicacao`.
- **Evidência:** AppRoutes.test: 3 rotas + navegação sem reload (6 testes ok)
- **Status:** ✅ Concluída.

## Fase 2 — Branding e design system

### T-010 — Definir conceito e direção da marca
- **Objetivo:** escolher nome, personalidade e direção visual.
- **Requisitos:** RF-16.
- **Arquivos:** `docs/PRD_SPEC.md`, `README.md`.
- **Critério de pronto:** conceito aprovado e documentado.
- **Teste/evidência:** decisão registrada.
- **Commit:** `docs: registrar direcao de marca do QuE IssO`.
- **Evidência:** direção registrada no PRD §10.1 e no README
- **Status:** ✅ Concluída.

### T-011 — Gerar proposta de logo com IA
- **Objetivo:** criar pelo menos uma proposta original de logo.
- **Requisitos:** RF-16.
- **Arquivos:** `src/assets/Log/**` (após aprovação), `docs/AI_USAGE.md`, `README.md`.
- **Critério de pronto:** ferramenta, prompt, resultado e justificativa documentados; logo aprovada.
- **Teste/evidência:** inspeção em fundo claro/escuro e tamanho reduzido.
- **Commit:** `feat: integrar assets de marca existentes`.
- **Evidência:** logo-light/dark.svg em src/assets/Log; prompt e decisão em AI_USAGE (Interação 04)
- **Status:** ✅ Concluída.

### T-012 — Criar paleta, tipografia e tokens
- **Objetivo:** definir tokens semânticos e temas light/dark.
- **Requisitos:** RF-14, RF-15, RF-16, RNF-01, RNF-02.
- **Arquivos:** `src/styles/tokens.ts`, `src/styles/themes.ts`.
- **Critério de pronto:** tokens documentados e contrastes revisados.
- **Teste/evidência:** inspeção visual dos dois temas.
- **Commit:** `style: definir tokens e temas de design`.
- **Evidência:** themes.test: 2 temas com mesmas chaves + 28 comparações WCAG AA (30 testes)
- **Status:** ✅ Concluída.

### T-013 — Configurar estilos globais e fontes
- **Objetivo:** configurar reset, tipografia, fundo e estilos base.
- **Requisitos:** RF-14, RF-15.
- **Arquivos:** `src/styles/GlobalStyle.ts`, `src/main.tsx`.
- **Critério de pronto:** estilos globais aplicados sem conflito.
- **Teste/evidência:** build e inspeção nas rotas.
- **Commit:** `style: configurar estilos globais`.
- **Evidência:** build ok; GlobalStyle com reset, fontes Baloo 2/Roboto, foco visível e reduced-motion
- **Status:** ✅ Concluída.

### T-014 — Criar ThemeProvider e ThemeToggle
- **Objetivo:** alternar tema e persistir preferência.
- **Requisitos:** RF-14.
- **Arquivos:** `src/contexts/ThemeContext/**`, `src/hooks/useTheme.ts`, `src/components/ThemeToggle/**`.
- **Critério de pronto:** todas as telas recebem tema atual e preferência sobrevive a refresh.
- **Teste/evidência:** teste de alternância e storage.
- **Commit:** `feat: adicionar temas claro e escuro persistentes`.
- **Evidência:** ThemeToggle.test: alternância, persistência e valores inválidos (8 testes novos)
- **Status:** ✅ Concluída.

### T-015 — Preparar favicon e assets finais
- **Objetivo:** integrar logo aprovada e favicon.
- **Requisitos:** RF-16.
- **Arquivos:** `public/favicon.*`, `src/assets/Log/**`, `index.html`.
- **Critério de pronto:** favicon e logo carregam sem erro.
- **Teste/evidência:** inspeção do navegador e rede.
- **Commit:** `feat: integrar marca e favicon`.
- **Evidência:** build copia favicon.svg para dist; index.html referencia /favicon.svg
- **Status:** ✅ Concluída.

## Fase 3 — Catálogo e Home

### T-016 — Definir tipos de domínio
- **Objetivo:** criar tipos Coffee, CartItem, DeliveryAddress, PaymentMethod e Order.
- **Requisitos:** RF-01 a RF-13.
- **Arquivos:** `src/types/**`.
- **Critério de pronto:** tipos representam contratos e não utilizam `any`.
- **Teste/evidência:** typecheck.
- **Commit:** `feat: definir tipos de dominio`.
- **Evidência:** typecheck e build ok; tipos em src/types sem `any`
- **Status:** ✅ Concluída.

### T-017 — Criar catálogo local tipado
- **Objetivo:** cadastrar cafés e metadados.
- **Requisitos:** RF-01, RN-08.
- **Arquivos:** `src/data/coffees.ts`, `src/assets/img/**`.
- **Critério de pronto:** todos os registros passam pelo tipo Coffee e imagens existem.
- **Teste/evidência:** teste de integridade dos dados.
- **Commit:** `feat: criar catalogo tipado de cafes`.
- **Evidência:** coffees.test: 14 produtos válidos e 14 PNGs correspondentes (17 testes novos)
- **Status:** ✅ Concluída.

### T-018 — Criar Header e PageLayout
- **Objetivo:** implementar cabeçalho e estrutura compartilhada.
- **Requisitos:** RF-04, RF-07, RF-14, RF-15, RF-16.
- **Arquivos:** `src/components/Header/**`, `src/components/PageLayout/**`.
- **Critério de pronto:** marca, navegação e layout aparecem nas páginas.
- **Teste/evidência:** teste de renderização e navegação por teclado.
- **Commit:** `feat: criar cabecalho e layout compartilhado`.
- **Evidência:** Header.test (4 testes) + rotas com PageLayout; build e testes ok
- **Status:** ✅ Concluída.

### T-019 — Criar QuantityInput
- **Objetivo:** permitir selecionar quantidade positiva.
- **Requisitos:** RF-02, RN-01.
- **Arquivos:** `src/components/QuantityInput/**`.
- **Critério de pronto:** não aceita zero, negativo, decimal ou valor inválido na ação de adicionar.
- **Teste/evidência:** testes de limites e interação.
- **Commit:** `feat: adicionar controle de quantidade validado`.
- **Evidência:** QuantityInput.test + quantity.test: limites e interação (novos testes ok)
- **Status:** ✅ Concluída.

### T-020 — Criar CoffeeCard
- **Objetivo:** apresentar informações do café e controle de quantidade.
- **Requisitos:** RF-01, RF-02.
- **Arquivos:** `src/components/CoffeeCard/**`.
- **Critério de pronto:** imagem, nome, descrição, preço, tags e quantidade são exibidos.
- **Teste/evidência:** teste de renderização e interação.
- **Commit:** `feat: criar card de produto`.
- **Evidência:** CoffeeCard.test + currency helpers; renderização e interação ok
- **Status:** ✅ Concluída.

### T-021 — Criar CoffeeCatalog
- **Objetivo:** listar cafés a partir do catálogo tipado.
- **Requisitos:** RF-01.
- **Arquivos:** `src/components/CoffeeCatalog/**`, `src/pages/Home/**`.
- **Critério de pronto:** todos os produtos aparecem e a Home não concentra a lógica do catálogo.
- **Teste/evidência:** teste de quantidade de cards e inspeção visual.
- **Commit:** `feat: renderizar catalogo de cafes na home`.
- **Evidência:** CoffeeCatalog.test + layout responsivo com grid mínimo de 17.25rem
- **Status:** ✅ Concluída.

### T-022 — Finalizar composição da Home
- **Objetivo:** integrar hero, catálogo, Header e layout conforme Figma validado.
- **Requisitos:** RF-01, RF-02, RF-15, RF-16.
- **Arquivos:** `src/pages/Home/**`, `src/components/**`.
- **Critério de pronto:** Home funcional e responsiva, alinhada ao design aprovado.
- **Teste/evidência:** smoke test desktop/mobile.
- **Commit:** `feat: finalizar pagina home responsiva`.
- **Evidência:** Home.test + AppRoutes.test; hero com PNG local e grade responsiva
- **Status:** ✅ Concluída.

## Fase 4 — Carrinho e persistência

### T-023 — Implementar cartReducer
- **Objetivo:** implementar ações imutáveis de carrinho.
- **Requisitos:** RF-03, RF-05, RF-11, RN-01, RN-02.
- **Arquivos:** `src/reducers/cartReducer.ts`.
- **Critério de pronto:** ações acumulam, incrementam, decrementam, removem e limpam corretamente.
- **Teste/evidência:** testes unitários de cada ação e casos de borda.
- **Commit:** `feat: implementar reducer imutavel do carrinho`.
- **Evidência:** cartReducer.test: todas as ações e casos de borda (novos testes ok)
- **Status:** ✅ Concluída.

### T-024 — Criar CartProvider e useCart
- **Objetivo:** disponibilizar estado e operações globalmente.
- **Requisitos:** RF-03, RF-04, RF-05.
- **Arquivos:** `src/contexts/CartContext/**`, `src/hooks/useCart.ts`.
- **Critério de pronto:** consumidores acessam API tipada e provider é obrigatório.
- **Teste/evidência:** teste de contexto.
- **Commit:** `feat: expor estado do carrinho por contexto`.
- **Evidência:** CartContext.test: operações tipadas e provider obrigatório
- **Status:** ✅ Concluída.

### T-025 — Implementar cálculos do carrinho
- **Objetivo:** derivar unidades, subtotal e total em centavos.
- **Requisitos:** RF-04, RF-10, RN-03, RN-04.
- **Arquivos:** `src/utils/cart.ts`, `src/utils/currency.ts`, configuração de taxa.
- **Critério de pronto:** cálculos puros e sem ponto flutuante monetário.
- **Teste/evidência:** testes para carrinho vazio, múltiplos produtos e quantidades.
- **Commit:** `feat: adicionar totais do carrinho e utilitarios`.
- **Evidência:** cart.test + currency.test: vazio, múltiplos produtos e quantidades
- **Status:** ✅ Concluída.

### T-026 — Criar CartBadge
- **Objetivo:** mostrar total de unidades no Header.
- **Requisitos:** RF-04.
- **Arquivos:** `src/components/CartBadge/**`.
- **Critério de pronto:** badge atualiza após cada ação e soma quantidades.
- **Teste/evidência:** teste com mais de um tipo e quantidades diferentes.
- **Commit:** `feat: exibir quantidade total do carrinho`.
- **Evidência:** CartBadge.test: soma de unidades e atualização no Header
- **Status:** ✅ Concluída.

### T-027 — Integrar adicionar ao carrinho na Home
- **Objetivo:** ligar ação do CoffeeCard ao Context.
- **Requisitos:** RF-02, RF-03, RF-04.
- **Arquivos:** `src/components/CoffeeCard/**`, `src/pages/Home/**`.
- **Critério de pronto:** adicionar produto atualiza estado e badge.
- **Teste/evidência:** teste de fluxo card → carrinho.
- **Commit:** `feat: conectar cards ao carrinho`.
- **Evidência:** Home.test: fluxo card → carrinho atualiza badge
- **Status:** ✅ Concluída.

### T-028 — Criar CartItem e EmptyCart
- **Objetivo:** apresentar item, controles e estado vazio.
- **Requisitos:** RF-05, RN-09.
- **Arquivos:** `src/components/CartItem/**`, `src/components/EmptyCart/**`.
- **Critério de pronto:** item pode ser alterado/removido e estado vazio é claro.
- **Teste/evidência:** testes de incremento, decremento e remoção.
- **Commit:** `feat: build cart item and empty state`.
- **Status:** ⏳ Não iniciada.

### T-029 — Persistir carrinho no localStorage
- **Objetivo:** recuperar e salvar carrinho com validação.
- **Requisitos:** RF-06, RN-06.
- **Arquivos:** `src/hooks/useLocalStorage.ts`, `src/utils/storage.ts`, `src/contexts/CartContext/**`.
- **Critério de pronto:** refresh recupera dados válidos e storage corrompido não quebra a aplicação.
- **Teste/evidência:** testes de hidratação, persistência e JSON inválido.
- **Commit:** `feat: persist cart in local storage`.
- **Status:** ⏳ Não iniciada.

### T-030 — Criar CartSummary
- **Objetivo:** apresentar subtotal, taxa e total.
- **Requisitos:** RF-10, RN-03, RN-04.
- **Arquivos:** `src/components/CartSummary/**`.
- **Critério de pronto:** valores refletem o estado atual e usam BRL.
- **Teste/evidência:** teste de renderização com valores conhecidos.
- **Commit:** `feat: display cart financial summary`.
- **Status:** ⏳ Não iniciada.

## Fase 5 — Checkout e CEP

### T-031 — Criar schema Zod do checkout
- **Objetivo:** definir regras dos campos e pagamento.
- **Requisitos:** RF-08, RF-09, RF-11, RN-07.
- **Arquivos:** `src/schemas/checkoutSchema.ts`, `src/types/checkout.ts`.
- **Critério de pronto:** schema valida obrigatórios, CEP normalizado, UF e complemento opcional.
- **Teste/evidência:** testes de entradas válidas e inválidas.
- **Commit:** `feat: validate checkout with zod`.
- **Status:** ⏳ Não iniciada.

### T-032 — Criar serviço ViaCEP
- **Objetivo:** consultar API pública e normalizar resposta.
- **Requisitos:** RF-08, RN-07.
- **Arquivos:** `src/services/cep/viaCep.ts`.
- **Critério de pronto:** trata CEP inválido, não encontrado, resposta parcial, HTTP/rede e cancelamento/obsolescência.
- **Teste/evidência:** testes mockados de todos os cenários.
- **Commit:** `feat: integrate viacep lookup service`.
- **Status:** ⏳ Não iniciada.

### T-033 — Criar DeliveryAddressForm
- **Objetivo:** construir formulário de endereço com React Hook Form.
- **Requisitos:** RF-08, RF-11.
- **Arquivos:** `src/components/DeliveryAddressForm/**`.
- **Critério de pronto:** campos, mensagens, loading e preenchimento automático funcionam; número e complemento não são sobrescritos.
- **Teste/evidência:** testes de preenchimento e erros acessíveis.
- **Commit:** `feat: build delivery address form`.
- **Status:** ⏳ Não iniciada.

### T-034 — Criar PaymentMethodSelector
- **Objetivo:** permitir escolher crédito, débito ou dinheiro.
- **Requisitos:** RF-09, RN-05.
- **Arquivos:** `src/components/PaymentMethodSelector/**`.
- **Critério de pronto:** uma opção válida é obrigatória e nenhuma transação é disparada.
- **Teste/evidência:** testes de seleção e validação.
- **Commit:** `feat: add payment method selector`.
- **Status:** ⏳ Não iniciada.

### T-035 — Montar página Checkout
- **Objetivo:** integrar itens, resumo, endereço e pagamento.
- **Requisitos:** RF-05, RF-08, RF-09, RF-10, RF-11, RF-15.
- **Arquivos:** `src/pages/Checkout/**`, `src/components/**`.
- **Critério de pronto:** checkout responsivo, estado vazio e formulário integrados.
- **Teste/evidência:** teste de renderização e fluxo principal.
- **Commit:** `feat: assemble checkout page`.
- **Status:** ⏳ Não iniciada.

### T-036 — Bloquear finalização inválida
- **Objetivo:** validar carrinho, IDs de produtos e formulário antes de confirmar.
- **Requisitos:** RF-11, RN-10.
- **Arquivos:** `src/pages/Checkout/**`, `src/utils/cart.ts`.
- **Critério de pronto:** não é possível concluir com carrinho vazio, itens inexistentes ou dados inválidos.
- **Teste/evidência:** testes negativos para cada condição.
- **Commit:** `fix: prevent invalid order submission`.
- **Status:** ⏳ Não iniciada.

## Fase 6 — Pedido e sucesso

### T-037 — Criar serviço/utilitário de snapshot de pedido
- **Objetivo:** gerar cópia imutável dos itens, endereço, pagamento e valores.
- **Requisitos:** RF-12, RF-13, RN-06.
- **Arquivos:** `src/types/order.ts`, `src/utils/order.ts`.
- **Critério de pronto:** snapshot contém preço/nome/quantidade no momento da compra e não depende do carrinho.
- **Teste/evidência:** teste de snapshot e independência.
- **Commit:** `feat: create immutable order snapshot`.
- **Status:** ⏳ Não iniciada.

### T-038 — Implementar confirmação e limpeza segura
- **Objetivo:** salvar pedido antes de limpar carrinho e navegar.
- **Requisitos:** RF-12, RF-13.
- **Arquivos:** `src/pages/Checkout/**`, `src/utils/storage.ts`.
- **Critério de pronto:** pedido fica persistido e carrinho é limpo somente após snapshot salvo.
- **Teste/evidência:** teste de ordem das operações.
- **Commit:** `feat: confirm order and clear cart safely`.
- **Status:** ⏳ Não iniciada.

### T-039 — Criar OrderSuccess
- **Objetivo:** apresentar dados do pedido concluído.
- **Requisitos:** RF-12, RF-13.
- **Arquivos:** `src/components/OrderSuccess/**`, `src/pages/Success/**`.
- **Critério de pronto:** tela exibe endereço, pagamento, itens e valores a partir do snapshot.
- **Teste/evidência:** teste com pedido conhecido.
- **Commit:** `feat: display completed order summary`.
- **Status:** ⏳ Não iniciada.

### T-040 — Tratar acesso sem pedido válido
- **Objetivo:** exibir estado vazio ao acessar Success sem snapshot.
- **Requisitos:** RN-09, RN-10.
- **Arquivos:** `src/pages/Success/**`, `src/components/EmptyCart/**`.
- **Critério de pronto:** não inventa pedido e oferece retorno à Home.
- **Teste/evidência:** teste de rota sem snapshot.
- **Commit:** `fix: handle missing order confirmation`.
- **Status:** ⏳ Não iniciada.

## Fase 7 — Responsividade, acessibilidade e qualidade

### T-041 — Revisar responsividade de todas as telas
- **Objetivo:** ajustar layout para mobile, tablet e desktop.
- **Requisitos:** RF-15, RNF-02.
- **Arquivos:** componentes e páginas afetados.
- **Critério de pronto:** fluxo completo utilizável sem overflow horizontal.
- **Teste/evidência:** inspeção em viewports definidos e registro de evidências.
- **Commit:** `style: refine responsive layouts`.
- **Status:** ⏳ Não iniciada.

### T-042 — Revisar acessibilidade
- **Objetivo:** validar labels, foco, teclado, contraste e mensagens.
- **Requisitos:** RNF-01.
- **Arquivos:** componentes interativos e estilos.
- **Critério de pronto:** controles operáveis por teclado, erros associados e foco visível.
- **Teste/evidência:** checklist manual e testes de acessibilidade disponíveis.
- **Commit:** `fix: improve interface accessibility`.
- **Status:** ⏳ Não iniciada.

### T-043 — Cobrir fluxos principais com testes
- **Objetivo:** completar testes unitários e integração.
- **Requisitos:** RF-01 a RF-16, RN-01 a RN-10.
- **Arquivos:** `src/**/*.test.*`, `src/tests/**`.
- **Critério de pronto:** testes cobrem reducer, cálculo, schema, CEP, persistência e compra.
- **Teste/evidência:** `npm run test` concluído com sucesso.
- **Commit:** `test: cover core shopping flows`.
- **Status:** ⏳ Não iniciada.

### T-044 — Executar revisão de qualidade
- **Objetivo:** corrigir erros de lint, tipos, build, console e assets.
- **Requisitos:** RNF-03, RNF-04, RNF-06.
- **Arquivos:** conforme achados.
- **Critério de pronto:** lint, typecheck, testes e build passam; sem erros conhecidos no console.
- **Teste/evidência:** anexar saída real dos comandos.
- **Commit:** `refactor: finalize quality review`.
- **Status:** ⏳ Não iniciada.

## Fase 8 — Documentação e entrega

### T-045 — Registrar uso de IA
- **Objetivo:** documentar pelo menos três interações relevantes.
- **Requisitos:** uso obrigatório de IA.
- **Arquivos:** `docs/AI_USAGE.md`.
- **Critério de pronto:** cada registro contém prompt, objetivo, resumo da resposta, decisão humana e evidência.
- **Teste/evidência:** revisão dos três registros.
- **Commit:** `docs: record ai-assisted development`.
- **Status:** ⏳ Não iniciada.

### T-046 — Finalizar README e Branding com IA
- **Objetivo:** documentar instalação, scripts, arquitetura, fluxo, marca e ferramenta de IA.
- **Requisitos:** RF-16, RNF-06.
- **Arquivos:** `README.md`, `docs/AI_USAGE.md`, assets.
- **Critério de pronto:** pessoa externa consegue instalar, executar e compreender o projeto; branding documentado.
- **Teste/evidência:** seguir README em ambiente limpo, se possível.
- **Commit:** `docs: complete project documentation`.
- **Status:** ⏳ Não iniciada.

### T-047 — Preparar deploy e demonstração
- **Objetivo:** publicar SPA e preparar apresentação do fluxo.
- **Requisitos:** RF-01 a RF-16.
- **Arquivos:** `README.md`, configuração de deploy se necessária.
- **Critério de pronto:** build publicado e fluxo demonstrável; URL real registrada.
- **Teste/evidência:** smoke test na URL publicada.
- **Commit:** `chore: prepare production deployment`.
- **Status:** ⏳ Não iniciada.

### T-048 — Revisão final de rastreabilidade
- **Objetivo:** verificar cada RF/RN/RNF contra implementação e evidência.
- **Requisitos:** todos.
- **Arquivos:** `docs/PRD_SPEC.md`, `docs/TECH_SPEC.md`, `docs/TASKS_SPEC.md`, `README.md`.
- **Critério de pronto:** requisitos atendidos ou pendências explicitamente documentadas; SPEC atualizados.
- **Teste/evidência:** matriz final de aceite revisada pelo estudante.
- **Commit:** `docs: finalize spec traceability`.
- **Status:** ⏳ Não iniciada.

## Registro de execução

| Data | Task ID | Resultado | Testes/evidência | Commit |
|---|---|---|---|---|
| 2026-11-17 | T-001 | Concluída | checklist de revisão na seção 14 do PRD | `docs: review product requirements specification` |
| 2026-11-17 | T-002 | Concluída | registro de revisão na seção 19 do TECH_SPEC | `docs: review technical specification` |
| 2026-11-17 | T-003 | Concluída | DP-01 a DP-07 resolvidas no PRD §12 e TECH §18 | `docs: approve product decisions` |
| 2026-11-17 | T-004 | Concluída | plano revisado; ordem T-001→T-048 mantida | `docs: approve implementation task plan` |
| 2026-11-21 | T-006 | Concluída | git status limpo; typecheck, lint e build executados sem erro | `chore: configure project tooling` |
| 2026-11-21 | T-007 | Concluída | build ok; 1 teste de setup passou com Vitest + jsdom | `chore: adicionar dependencias de aplicacao e testes` |
| 2026-11-21 | T-008 | Concluída | alias @/ em vite e tsconfig; typecheck, 2 testes e build ok | `chore: organizar estrutura e alias da aplicacao` |
| 2026-11-21 | T-009 | Concluída | AppRoutes.test: 3 rotas + navegação sem reload (6 testes ok) | `feat: configurar rotas da aplicacao` |
| 2026-11-21 | T-010 | Concluída | direção registrada no PRD §10.1 e no README | `docs: registrar direcao de marca do QuE IssO` |
| 2026-11-21 | T-011 | Concluída | logo-light/dark.svg em src/assets/Log; prompt e decisão em AI_USAGE (Interação 04) | `feat: integrar assets de marca existentes` |
| 2026-11-21 | T-012 | Concluída | themes.test: 2 temas com mesmas chaves + 28 comparações WCAG AA (30 testes) | `style: definir tokens e temas de design` |
| 2026-11-21 | T-013 | Concluída | build ok; GlobalStyle com reset, fontes Baloo 2/Roboto, foco visível e reduced-motion | `style: configurar estilos globais` |
| 2026-11-21 | T-014 | Concluída | ThemeToggle.test: alternância, persistência e valores inválidos (8 testes novos) | `feat: adicionar temas claro e escuro persistentes` |
| 2026-11-21 | T-015 | Concluída | build copia favicon.svg para dist; index.html referencia /favicon.svg | `feat: integrar marca e favicon` |
| 2026-11-21 | T-016 | Concluída | typecheck e build ok; tipos em src/types sem `any` | `feat: definir tipos de dominio` |
| 2026-11-21 | T-017 | Concluída | coffees.test: 14 produtos válidos e 14 PNGs correspondentes (17 testes novos) | `feat: criar catalogo tipado de cafes` |
| 2026-11-21 | T-018 | Concluída | Header.test (4 testes) + rotas com PageLayout; build e testes ok | `feat: criar cabecalho e layout compartilhado` |
| 2026-11-21 | T-019 | Concluída | QuantityInput.test + quantity.test: limites e interação (novos testes ok) | `feat: adicionar controle de quantidade validado` |
| 2026-11-21 | T-020 | Concluída | CoffeeCard.test + currency helpers; renderização e interação ok | `feat: criar card de produto` |
| 2026-11-21 | T-021 | Concluída | CoffeeCatalog.test + layout responsivo com grid mínimo de 17.25rem | `feat: renderizar catalogo de cafes na home` |
| 2026-11-21 | T-022 | Concluída | Home.test + AppRoutes.test; hero com PNG local e grade responsiva | `feat: finalizar pagina home responsiva` |
| 2026-11-21 | T-023 | Concluída | cartReducer.test: todas as ações e casos de borda (novos testes ok) | `feat: implementar reducer imutavel do carrinho` |
| 2026-11-21 | T-024 | Concluída | CartContext.test: operações tipadas e provider obrigatório | `feat: expor estado do carrinho por contexto` |
| 2026-11-21 | T-025 | Concluída | cart.test + currency.test: vazio, múltiplos produtos e quantidades | `feat: adicionar totais do carrinho e utilitarios` |
| 2026-11-21 | T-026 | Concluída | CartBadge.test: soma de unidades e atualização no Header | `feat: exibir quantidade total do carrinho` |
| 2026-11-21 | T-027 | Concluída | Home.test: fluxo card → carrinho atualiza badge | `feat: conectar cards ao carrinho` |

## Definition of Done global

Uma tarefa só pode ser concluída quando:
- comportamento observável atende ao critério;
- requisitos relacionados foram considerados;
- testes pertinentes foram executados;
- typecheck/lint/build foram executados quando aplicáveis;
- documentação e checklist foram atualizados;
- estudante revisou e compreende a alteração;
- commit semântico foi registrado, quando o fluxo Git estiver em uso.

O projeto só está concluído quando todos os critérios gerais do PRD forem demonstrados e as pendências restantes estiverem explicitamente justificadas.
