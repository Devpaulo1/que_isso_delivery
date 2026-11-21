---
title: "QuE IssO — Task Specification"
version: "1.0.0"
status: "Backlog inicial"
---

# TaskSpec — QuE IssO

## 1. Como utilizar

- Executar tarefas na ordem das fases, respeitando dependências.
- Cada tarefa deve ser pequena, verificável e associada a requisitos RF/RN do PRD.
- Marcar `[x]` somente após implementação e validação.
- Não começar uma fase dependente enquanto os critérios de saída da fase anterior não forem atendidos.
- Se surgir mudança de escopo, atualizar PRD/TechSpec antes de alterar tarefas.

## 2. Mapa de dependências

```text
Fase 0 — Fundação e setup
        ↓
Fase 1 — Design system e shell
        ↓
Fase 2 — Catálogo e carrinho
        ↓
Fase 3 — Persistência e tema
        ↓
Fase 4 — Checkout e ViaCEP
        ↓
Fase 5 — Pedido e confirmação
        ↓
Fase 6 — Qualidade, acessibilidade e responsividade
        ↓
Fase 7 — Branding, documentação e entrega
```

## 3. Backlog executável

### Fase 0 — Fundação e setup

- [ ] **TASK-001 — Inicializar aplicação React + TypeScript + Vite**
  - Dependências: nenhuma.
  - Entrega: projeto executável com scripts `dev`, `build` e `preview`.
  - Aceite: aplicação inicia localmente e build de produção funciona.
  - Requisitos: base técnica.

- [ ] **TASK-002 — Configurar TypeScript strict e aliases**
  - Dependências: TASK-001.
  - Entrega: `tsconfig` estrito e aliases consistentes.
  - Aceite: `tsc --noEmit` executa sem erro inicial.

- [ ] **TASK-003 — Configurar ESLint e Prettier**
  - Dependências: TASK-001.
  - Entrega: lint e formatação padronizados.
  - Aceite: scripts documentados e executáveis.

- [ ] **TASK-004 — Configurar Vitest e Testing Library**
  - Dependências: TASK-001.
  - Entrega: ambiente de testes e teste smoke.
  - Aceite: teste de exemplo passa.

- [ ] **TASK-005 — Criar estrutura de diretórios e arquivos de especificação**
  - Dependências: TASK-001.
  - Entrega: pastas iniciais conforme TechSpec e documentos `spec/`.
  - Aceite: imports e limites de responsabilidade coerentes.

**Gate da fase:** aplicação inicializa, build, lint e teste smoke funcionam.

### Fase 1 — Design system e shell

- [ ] **TASK-006 — Definir tokens globais de design**
  - Dependências: TASK-001.
  - Entrega: cores semânticas, espaçamentos, radius, sombras e tipografia.
  - Aceite: componentes não precisam duplicar tokens globais.

- [ ] **TASK-007 — Criar temas claro e escuro**
  - Dependências: TASK-006.
  - Entrega: CSS variables para `[data-theme="light"]` e `[data-theme="dark"]`.
  - Aceite: contraste e legibilidade verificados nos dois temas.
  - Requisitos: RF-14, RNF-03.

- [ ] **TASK-008 — Criar AppProviders e App Shell**
  - Dependências: TASK-001, TASK-007.
  - Entrega: composição dos providers e layout global.
  - Aceite: aplicação renderiza sem acoplamento de provider às páginas.

- [ ] **TASK-009 — Configurar React Router**
  - Dependências: TASK-008.
  - Entrega: rotas `/`, `/checkout`, `/success` e fallback.
  - Aceite: navegação SPA sem reload.
  - Requisitos: RF-07.

- [ ] **TASK-010 — Implementar Header e controle de tema**
  - Dependências: TASK-007, TASK-008.
  - Entrega: Header responsivo, logo provisória/placeholder explicitamente temporário, toggle de tema.
  - Aceite: tema troca em toda a aplicação e o Header funciona em mobile.
  - Requisitos: RF-14, RF-15.

**Gate da fase:** shell e rotas renderizam; tema alterna globalmente.

### Fase 2 — Catálogo e carrinho

- [ ] **TASK-011 — Definir tipos Product e catálogo local**
  - Dependências: TASK-001.
  - Entrega: produtos tipados, IDs estáveis, preço em centavos e assets válidos.
  - Aceite: dados podem ser importados sem `any`.
  - Requisitos: RF-01, RN-08.

- [ ] **TASK-012 — Criar ProductCard e grid de catálogo**
  - Dependências: TASK-006, TASK-011.
  - Entrega: card com imagem, nome, descrição, preço e tags.
  - Aceite: Home exibe os produtos do catálogo.
  - Requisitos: RF-01.

- [ ] **TASK-013 — Implementar QuantitySelector**
  - Dependências: TASK-012.
  - Entrega: controles acessíveis de incremento/decremento.
  - Aceite: quantidade nunca fica abaixo de 1 na seleção prévia.
  - Requisitos: RF-02, RN-01.

- [ ] **TASK-014 — Implementar tipos, reducer e ações do carrinho**
  - Dependências: TASK-011.
  - Entrega: `CartState`, `CartAction`, `cartReducer` puro.
  - Aceite: produto repetido acumula, decremento de 1 remove e não há mutação.
  - Requisitos: RF-03, RF-05, RN-01, RN-02.

- [ ] **TASK-015 — Implementar CartProvider e hooks de acesso**
  - Dependências: TASK-014, TASK-008.
  - Entrega: provider com state/dispatch encapsulados.
  - Aceite: páginas e componentes acessam o estado sem duplicá-lo.
  - Requisitos: RF-03, RF-05.

- [ ] **TASK-016 — Criar selectors e cálculos monetários**
  - Dependências: TASK-014.
  - Entrega: unidades, quantidade de linhas, subtotal e total em centavos; taxa centralizada.
  - Aceite: testes cobrem múltiplas quantidades e valores.
  - Requisitos: RF-04, RF-10, RN-03, RN-04.

- [ ] **TASK-017 — Implementar carrinho e resumo de compra**
  - Dependências: TASK-015, TASK-016.
  - Entrega: linhas, controles, remoção, estado vazio e totais.
  - Aceite: totais e quantidades atualizam imediatamente.
  - Requisitos: RF-04, RF-05, RF-10, RN-09.

- [ ] **TASK-018 — Conectar ação de adicionar ao carrinho**
  - Dependências: TASK-013, TASK-015.
  - Entrega: adicionar produto e quantidade escolhida.
  - Aceite: repetir adição acumula na mesma linha.
  - Requisitos: RF-03, RN-02.

- [ ] **TASK-019 — Conectar contador do Header**
  - Dependências: TASK-016.
  - Entrega: contador de unidades no Header.
  - Aceite: contador soma quantidades, não linhas.
  - Requisitos: RF-04.

**Gate da fase:** Home e carrinho funcionam com produtos, quantidades e cálculos corretos.

### Fase 3 — Persistência e tema

- [ ] **TASK-020 — Criar adaptador de localStorage**
  - Dependências: TASK-001.
  - Entrega: leitura, escrita, remoção, parse seguro e tratamento de indisponibilidade.
  - Aceite: JSON inválido não derruba aplicação.
  - Requisitos: RF-06, RN-06, RN-12.

- [ ] **TASK-021 — Persistir e hidratar carrinho**
  - Dependências: TASK-015, TASK-020.
  - Entrega: persistência versionada do carrinho.
  - Aceite: refresh recupera carrinho válido; dado inválido retorna a estado seguro.
  - Requisitos: RF-06.

- [ ] **TASK-022 — Persistir preferência de tema**
  - Dependências: TASK-007, TASK-020.
  - Entrega: persistência do tema.
  - Aceite: tema permanece após refresh.
  - Requisitos: RF-14.

**Gate da fase:** carrinho e tema persistem com recuperação segura.

### Fase 4 — Checkout e ViaCEP

- [ ] **TASK-023 — Criar schema e tipos do endereço**
  - Dependências: TASK-001.
  - Entrega: schema com CEP, rua, número, complemento opcional, bairro, cidade e UF.
  - Aceite: campos obrigatórios e opcionais validados conforme PRD.
  - Requisitos: RF-08, RF-11, RN-07.

- [ ] **TASK-024 — Criar serviço ViaCEP**
  - Dependências: TASK-023.
  - Entrega: normalização, validação de CEP, fetch e mapeamento de resposta.
  - Aceite: trata sucesso, CEP inexistente, formato inválido e falha de rede.
  - Requisitos: RF-08, RN-07.

- [ ] **TASK-025 — Tratar estados de consulta e corrida de requisições**
  - Dependências: TASK-024.
  - Entrega: idle/loading/success/not-found/invalid/error e cancelamento/controle de resposta antiga.
  - Aceite: consulta antiga não sobrescreve CEP mais recente.
  - Requisitos: RF-08.

- [ ] **TASK-026 — Implementar AddressForm**
  - Dependências: TASK-023, TASK-025.
  - Entrega: campos, integração CEP, preenchimento automático e correção manual.
  - Aceite: número/complemento não são sobrescritos; complemento opcional.
  - Requisitos: RF-08, RF-11, RN-07.

- [ ] **TASK-027 — Implementar seletor de pagamento**
  - Dependências: TASK-001.
  - Entrega: crédito, débito e dinheiro.
  - Aceite: escolha única, obrigatória e acessível.
  - Requisitos: RF-09, RN-05.

- [ ] **TASK-028 — Implementar CheckoutPage**
  - Dependências: TASK-017, TASK-023, TASK-026, TASK-027.
  - Entrega: composição do carrinho, endereço, pagamento e resumo.
  - Aceite: carrinho vazio e formulário inválido impedem conclusão.
  - Requisitos: RF-08, RF-09, RF-10, RF-11.

**Gate da fase:** checkout completo com CEP real, validação e bloqueios.

### Fase 5 — Pedido e confirmação

- [ ] **TASK-029 — Criar modelo e factory do OrderSnapshot**
  - Dependências: TASK-016, TASK-023, TASK-027.
  - Entrega: snapshot independente com ID, data, itens, endereço, pagamento e totais.
  - Aceite: dados do pedido não dependem de referências mutáveis do carrinho.
  - Requisitos: RF-12, RF-13, RN-06, RN-11.

- [ ] **TASK-030 — Implementar persistência do último pedido**
  - Dependências: TASK-020, TASK-029.
  - Entrega: salvar e recuperar pedido concluído separadamente.
  - Aceite: refresh em Success mantém o pedido; ausência de snapshot é tratada.
  - Requisitos: RF-12, RF-13, RN-09.

- [ ] **TASK-031 — Implementar fluxo de confirmação**
  - Dependências: TASK-028, TASK-029, TASK-030.
  - Entrega: revalidar, criar snapshot, persistir, limpar carrinho e navegar.
  - Aceite: falha ao persistir não limpa carrinho; sucesso limpa carrinho após salvar snapshot.
  - Requisitos: RF-11, RF-12, RF-13.

- [ ] **TASK-032 — Implementar SuccessPage e estado vazio**
  - Dependências: TASK-030, TASK-031.
  - Entrega: confirmação com endereço, pagamento, itens e valores.
  - Aceite: exibe snapshot correto; sem pedido válido apresenta fallback.
  - Requisitos: RF-12, RN-09.

**Gate da fase:** pedido fictício conclui de ponta a ponta e sobrevive ao refresh.

### Fase 6 — Qualidade, acessibilidade e responsividade

- [ ] **TASK-033 — Testar reducer e selectors**
  - Dependências: TASK-014, TASK-016.
  - Entrega: testes unitários das ações e cálculos.
  - Aceite: cobrir repetição, incremento, decremento, remoção, limpeza e subtotal.

- [ ] **TASK-034 — Testar persistência e recuperação**
  - Dependências: TASK-020, TASK-021, TASK-030.
  - Entrega: testes de armazenamento válido, inválido e versionamento.
  - Aceite: falhas não derrubam a aplicação.

- [ ] **TASK-035 — Testar ViaCEP e formulário**
  - Dependências: TASK-024, TASK-026.
  - Entrega: mocks para sucesso, erro de negócio, HTTP e rede.
  - Aceite: estados e preenchimento automático cobertos.

- [ ] **TASK-036 — Testar fluxo de checkout e pedido**
  - Dependências: TASK-031, TASK-032.
  - Entrega: testes de integração do fluxo crítico.
  - Aceite: carrinho vazio/inválido bloqueia; pedido válido persiste e limpa carrinho.

- [ ] **TASK-037 — Revisar acessibilidade**
  - Dependências: TASK-010, TASK-012, TASK-017, TASK-026, TASK-032.
  - Entrega: labels, foco, teclado, erros associados, contraste e feedback acessível.
  - Aceite: fluxo principal utilizável sem mouse.
  - Requisitos: RNF-03, RF-11.

- [ ] **TASK-038 — Revisar responsividade**
  - Dependências: telas principais implementadas.
  - Entrega: ajustes mobile/tablet/desktop.
  - Aceite: validar 360 px, 768 px e 1280 px sem overflow e sem controles inacessíveis.
  - Requisitos: RF-15.

- [ ] **TASK-039 — Executar verificação técnica completa**
  - Dependências: TASK-033 a TASK-038.
  - Entrega: typecheck, lint, testes e build.
  - Aceite: comandos passam; pendências documentadas.

**Gate da fase:** testes, acessibilidade, responsividade e qualidade técnica aprovados.

### Fase 7 — Branding, documentação e entrega

- [ ] **TASK-040 — Definir conceito e identidade da marca**
  - Dependências: TASK-006.
  - Entrega: nome, conceito, paleta, tipografia e versões para fundos claros/escuros.
  - Aceite: identidade coerente com cafeteria e com os dois temas.

- [ ] **TASK-041 — Gerar e curar logo original com IA**
  - Dependências: TASK-040.
  - Entrega: proposta gerada, escolha humana, arquivos finais e variações.
  - Aceite: logo legível em tamanho reduzido e adequada a fundos claros/escuros.
  - Requisitos: RF-16.
  - Nota: registrar ferramenta e prompt real utilizado; não inventar histórico de geração.

- [ ] **TASK-042 — Integrar logo e favicon**
  - Dependências: TASK-041.
  - Entrega: logo no Header, favicon e assets locais.
  - Aceite: nenhuma imagem quebrada; paths locais e versões corretas por tema.
  - Requisitos: RF-16.

- [ ] **TASK-043 — Documentar Branding com IA**
  - Dependências: TASK-041.
  - Entrega: seção README com ferramenta, prompt, resultado, justificativa e direitos de uso.
  - Aceite: documentação reproduz o processo real.

- [ ] **TASK-044 — Finalizar README**
  - Dependências: TASK-039, TASK-042, TASK-043.
  - Entrega: descrição, funcionalidades, stack, instalação, scripts, arquitetura, testes, limitações e branding.
  - Aceite: outra pessoa consegue instalar e executar o projeto seguindo o README.

- [ ] **TASK-045 — Revisão final contra o PRD**
  - Dependências: todas as tarefas anteriores.
  - Entrega: checklist RF-01 a RF-16 e RN-01 a RN-12.
  - Aceite: cada requisito possui evidência; lacunas são corrigidas ou explicitamente registradas.

**Gate final:** todos os requisitos funcionais demonstrados, documentação pronta e build reproduzível.

## 4. Matriz de rastreabilidade

| RF | Tarefas principais |
|---|---|
| RF-01 | TASK-011, TASK-012 |
| RF-02 | TASK-013 |
| RF-03 | TASK-014, TASK-015, TASK-018 |
| RF-04 | TASK-016, TASK-019 |
| RF-05 | TASK-014, TASK-017 |
| RF-06 | TASK-020, TASK-021 |
| RF-07 | TASK-009 |
| RF-08 | TASK-023 a TASK-026 |
| RF-09 | TASK-027, TASK-028 |
| RF-10 | TASK-016, TASK-017, TASK-028 |
| RF-11 | TASK-023, TASK-028, TASK-031 |
| RF-12 | TASK-029 a TASK-032 |
| RF-13 | TASK-029 a TASK-032 |
| RF-14 | TASK-007, TASK-010, TASK-022 |
| RF-15 | TASK-010, TASK-037, TASK-038 |
| RF-16 | TASK-040 a TASK-043 |

## 5. Checklist de release

- [ ] Todos os RFs foram demonstrados.
- [ ] Carrinho acumula produtos sem duplicar linhas.
- [ ] Valores são calculados em centavos.
- [ ] Carrinho persiste após refresh.
- [ ] Consulta ViaCEP funciona e trata falhas.
- [ ] Formulário bloqueia dados inválidos.
- [ ] Pedido é salvo antes da limpeza do carrinho.
- [ ] Success não depende do carrinho.
- [ ] Tema persiste em todas as rotas.
- [ ] Layout validado em mobile, tablet e desktop.
- [ ] Acessibilidade revisada.
- [ ] Testes, lint, typecheck e build passam.
- [ ] Logo e favicon finais estão integrados.
- [ ] README e seção Branding com IA estão completos.
