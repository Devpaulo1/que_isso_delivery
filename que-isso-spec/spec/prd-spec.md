---
title: "QuE IssO — Product Requirements Document"
version: "1.0.0"
status: "Proposto para revisão"
owner: "Equipe/Aluno responsável pelo projeto SPA"
product: "QuE IssO"
---

# PRD — QuE IssO

## 1. Visão geral

### 1.1 Contexto

QuE IssO é um e-commerce fictício de cafeteria, adaptado do desafio da formação React 2022 para o projeto final da disciplina SPA. A aplicação permite consultar um catálogo local de cafés, selecionar quantidades, montar um carrinho, informar endereço de entrega, escolher uma forma de pagamento e visualizar a confirmação de um pedido simulado.

### 1.2 Problema

O projeto precisa demonstrar, em uma experiência integrada, a capacidade de construir uma SPA em React e TypeScript com gerenciamento de estado, navegação, formulários, persistência local, consumo de API pública, responsividade, acessibilidade, testes e documentação.

### 1.3 Objetivo do produto

Entregar uma experiência de compra fictícia, clara e consistente, na qual o usuário consiga concluir o fluxo sem backend, autenticação, banco de dados ou transação financeira.

### 1.4 Objetivos educacionais

- Aplicar React, TypeScript, componentes e Props.
- Utilizar Hooks, Context API e `useReducer`.
- Aplicar imutabilidade e manipulação de arrays.
- Implementar navegação com React Router.
- Construir e validar formulários.
- Persistir preferências e carrinho com `localStorage`.
- Consumir uma API pública de CEP.
- Criar interface responsiva com temas claro e escuro.
- Escrever testes e documentação técnica/funcional.

## 2. Público e personas

### Persona principal — Cliente da cafeteria

Pessoa que deseja escolher cafés de forma rápida, conferir valores, informar endereço e concluir um pedido fictício. Pode acessar a aplicação por desktop ou celular.

### Necessidades

- Entender rapidamente os produtos e suas características.
- Ajustar quantidades sem confusão.
- Conferir itens e valores antes de concluir.
- Preencher o endereço com o mínimo de digitação, por meio da consulta de CEP.
- Receber confirmação clara do pedido.
- Usar a aplicação em telas pequenas e em tema claro ou escuro.

## 3. Escopo

### 3.1 Dentro do escopo

- Catálogo local tipado de cafés.
- Seleção de quantidade e adição ao carrinho.
- Carrinho com atualização e remoção de itens.
- Contador de unidades no Header.
- Persistência do carrinho.
- Rotas Home, Checkout e Success.
- Formulário de endereço com consulta obrigatória ao ViaCEP.
- Seleção de crédito, débito ou dinheiro, sem transação.
- Cálculo de subtotal, entrega e total.
- Validação e feedback acessível.
- Snapshot do pedido concluído.
- Tema claro/escuro persistente.
- Layout responsivo.
- Logo original gerada com auxílio de IA e documentação da marca.
- Testes automatizados e README.

### 3.2 Fora do escopo

- Backend ou API própria.
- Banco de dados.
- Cadastro, login ou autenticação.
- Pagamento real, gateway, captura de cartão ou armazenamento de dados financeiros.
- Rastreamento/logística real.
- Painel administrativo.
- Estoque transacional ou atualização remota do catálogo.
- Envio real de e-mail, SMS ou WhatsApp.

## 4. Jornada principal

1. Usuário acessa a Home.
2. Visualiza os cafés e suas informações.
3. Escolhe a quantidade desejada e adiciona o produto.
4. O Header atualiza o contador de unidades.
5. Usuário abre o Checkout.
6. Confere, altera ou remove itens.
7. Informa o CEP; a aplicação consulta a API e preenche os campos disponíveis.
8. Informa número e, opcionalmente, complemento; revisa os demais campos.
9. Seleciona uma forma de pagamento.
10. Confere subtotal, taxa de entrega e total.
11. Confirma o pedido.
12. A aplicação salva um snapshot do pedido, limpa o carrinho e navega para Success.
13. A tela Success exibe o resumo do pedido concluído.

## 5. Requisitos funcionais

| ID | Requisito | Critérios de aceite |
|---|---|---|
| RF-01 | Exibir catálogo de cafés com imagem, nome, descrição, preço e categoria/tag. | Todos os produtos tipados do catálogo local são exibidos corretamente na Home. |
| RF-02 | Selecionar quantidade antes de adicionar. | Quantidade é inteira e positiva; controles possuem limites e feedback. |
| RF-03 | Adicionar cafés ao carrinho e acumular produtos repetidos. | Adicionar novamente o mesmo ID atualiza a linha existente; não cria duplicata. |
| RF-04 | Exibir contador de unidades no Header. | Contador é a soma das quantidades de todas as linhas, não o número de tipos. |
| RF-05 | Aumentar, diminuir e remover itens individualmente. | Quantidades, subtotal e contador são atualizados imediatamente; reduzir de 1 para 0 remove a linha. |
| RF-06 | Persistir carrinho em localStorage. | Carrinho válido é restaurado após refresh; JSON inválido é tratado sem quebrar a aplicação. |
| RF-07 | Navegar entre Home, Checkout e Confirmação com React Router. | Navegação SPA sem reload completo; rotas inválidas e confirmação sem pedido têm fallback apropriado. |
| RF-08 | Preencher e validar endereço. | CEP válido consulta API pública e preenche logradouro, bairro, cidade e UF disponíveis; número e complemento são manuais; falhas são comunicadas. |
| RF-09 | Selecionar pagamento. | Crédito, débito ou dinheiro; seleção obrigatória antes de concluir. |
| RF-10 | Exibir subtotal, entrega e total. | Subtotal = soma de preço × quantidade; total = subtotal + entrega; valores consistentes. |
| RF-11 | Impedir conclusão com carrinho vazio ou formulário inválido. | Usuário recebe feedback acessível e permanece no Checkout. |
| RF-12 | Confirmar pedido fictício e mostrar endereço e pagamento. | Tela de sucesso apresenta dados do snapshot do pedido correto. |
| RF-13 | Limpar carrinho após confirmar, preservando pedido. | Carrinho fica vazio, mas Success mantém resumo independente e correto. |
| RF-14 | Alternar light/dark mode. | Tema é aplicado a todas as telas e persiste após refresh. |
| RF-15 | Adaptar interface para dispositivos móveis. | Home, Header, carrinho, formulário e sucesso são utilizáveis em telas pequenas. |
| RF-16 | Aplicar logo original gerada com IA. | Logo aparece no Header e favicon; arquivos locais não quebram; documentação de branding contém ferramenta, prompt, resultado e justificativa. |

## 6. Regras de negócio

- **RN-01 — Quantidades:** não aceitar zero, negativos, frações, `NaN` ou valores não numéricos. No carrinho, decrementar de 1 remove o item.
- **RN-02 — Produto único:** cada produto é identificado por `productId`; adicionar novamente incrementa a linha existente.
- **RN-03 — Cálculo:** subtotal = Σ(preço unitário em centavos × quantidade); total = subtotal + taxa de entrega. A taxa inicial definida para o projeto é fictícia e fixa: **R$ 5,00 (500 centavos)**. Deve existir em uma única constante central.
- **RN-04 — Dinheiro:** cálculos em centavos inteiros; exibição em BRL com duas casas decimais via `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`.
- **RN-05 — Pagamento:** escolha informativa; não existe transação financeira.
- **RN-06 — Persistência:** carrinho sobrevive ao refresh. Pedido concluído é snapshot independente, salvo separadamente do carrinho.
- **RN-07 — Endereço:** complemento opcional. CEP deve ser validado e consultado via API pública. Preencher logradouro, bairro, localidade e UF quando disponíveis. Número é obrigatório e manual. Tratar CEP inválido, não encontrado, carregamento, falha de rede e resposta incompleta; permitir correção manual.
- **RN-08 — Dados:** catálogo pode vir de arquivo local tipado. Backend não é necessário. API de CEP é obrigatória.
- **RN-09 — Estados vazios:** carrinho vazio tem orientação para voltar ao catálogo; rota Success sem pedido válido mostra estado vazio e ação para voltar à Home.
- **RN-10 — Navegação:** impedir conclusão se houver erros de validação, carrinho vazio ou produto inexistente no catálogo.
- **RN-11 — Snapshot:** pedido contém identificador, data de criação, linhas com nome/preço/quantidade congelados, endereço, pagamento, subtotal, entrega e total.
- **RN-12 — Integridade local:** dados lidos do armazenamento são não confiáveis; validar formato e versão antes de hidratar estado.

## 7. Requisitos não funcionais

- **RNF-01 — Usabilidade:** fluxo principal compreensível, com ações e feedback claros.
- **RNF-02 — Responsividade:** experiência utilizável em larguras mobile, tablet e desktop.
- **RNF-03 — Acessibilidade:** labels, foco visível, navegação por teclado, mensagens associadas aos campos, contraste e semântica adequada.
- **RNF-04 — Desempenho:** evitar renderizações e dependências desnecessárias; imagens otimizadas e dimensões reservadas.
- **RNF-05 — Manutenibilidade:** módulos por domínio/feature, regras centralizadas, TypeScript estrito e documentação atualizada.
- **RNF-06 — Confiabilidade:** erros de rede e armazenamento não devem derrubar a aplicação.
- **RNF-07 — Privacidade:** endereço é utilizado somente para a simulação local; não registrar dados pessoais em logs.
- **RNF-08 — Compatibilidade:** suportar versões atuais dos principais navegadores evergreen.
- **RNF-09 — Testabilidade:** regras de domínio e reducers testáveis sem navegador; integrações externas mockáveis.

## 8. Requisitos de conteúdo e identidade visual

- Referência visual: [Figma — QuE IssO](https://www.figma.com/design/yGPNTA0Yczb183EikXGIiA/Coffee-Delivery-%E2%80%A2-Projeto-Final-React?node-id=217-511).
- Referência original utiliza amarelo e roxo, Baloo 2 para títulos e Roboto para textos.
- É permitido criar marca autoral, desde que o propósito de cafeteria permaneça.
- Criar logo original com ferramenta de geração de imagem/identidade visual por IA.
- Definir conceito, paleta, tipografia e versões para fundos claros e escuros.
- Armazenar assets finais em `src/assets/` ou `public/`; preparar favicon.
- README deve conter seção **Branding com IA**: ferramenta, prompt efetivamente utilizado, imagem final, justificativa de escolha e observações sobre direitos de uso.
- Verificar legibilidade da marca em tamanho reduzido.

## 9. Critérios de aceite de ponta a ponta

- **CA-01:** usuário adiciona dois cafés diferentes e adiciona novamente um deles; o carrinho mantém duas linhas e soma a quantidade correta.
- **CA-02:** contador do Header representa a soma das unidades e persiste após refresh.
- **CA-03:** usuário altera e remove itens; subtotal, entrega e total permanecem corretos.
- **CA-04:** CEP válido preenche os dados retornados pela API; número e complemento continuam sob controle do usuário.
- **CA-05:** CEP inválido, inexistente ou API indisponível gera mensagem clara e permite correção.
- **CA-06:** carrinho vazio ou formulário inválido bloqueia conclusão.
- **CA-07:** pedido confirmado gera snapshot correto, limpa carrinho e mantém tela Success correta.
- **CA-08:** refresh em Success mantém o snapshot enquanto válido; acesso sem snapshot mostra estado vazio.
- **CA-09:** tema selecionado persiste e é aplicado em todas as rotas.
- **CA-10:** fluxo completo funciona por teclado e em viewport mobile.

## 10. Métricas de conclusão do projeto

- 16/16 requisitos funcionais implementados e demonstrados.
- 12/12 regras de negócio respeitadas.
- Testes automatizados cobrindo reducers, cálculos, validações e fluxo crítico.
- Nenhum erro de TypeScript ou lint.
- Fluxo completo verificado em desktop e mobile.
- README com instruções, arquitetura, testes e branding com IA.

## 11. Premissas, riscos e decisões pendentes

| Item | Premissa/risco | Tratamento |
|---|---|---|
| Catálogo | Produtos são estáticos e locais. | Criar arquivo tipado com IDs estáveis e imagens locais/remotas licenciadas. |
| ViaCEP | Serviço externo pode ficar indisponível. | Loading, tratamento de falha e edição manual dos campos. |
| Persistência | localStorage pode conter dados inválidos ou antigos. | Validar schema, versionar envelope e recuperar com estado seguro. |
| Taxa | Projeto não define valor. | Adotar R$ 5,00 como valor fictício inicial, centralizado e documentado. |
| Figma | Acesso automatizado ao arquivo não foi concedido durante a elaboração. | Fazer conferência visual manual quando o arquivo estiver acessível; não inventar medidas. |
| Logo | A geração e curadoria são entregáveis do projeto. | Executar tarefa própria e registrar prompt/resultado real no README. |

## 12. Rastreabilidade

| Requisitos | Domínio principal | Evidência esperada |
|---|---|---|
| RF-01, RF-02 | Catálogo | Renderização, seletor de quantidade e testes de componentes |
| RF-03, RF-04, RF-05, RF-06 | Carrinho | Reducer, seletor de unidades, persistência e testes |
| RF-07 | Navegação | Rotas e testes de navegação |
| RF-08 | Endereço | Serviço ViaCEP, formulário e testes de integração mockados |
| RF-09, RF-10, RF-11 | Checkout | Schema de validação, cálculo e testes |
| RF-12, RF-13 | Pedido | Snapshot, limpeza do carrinho e tela Success |
| RF-14 | Tema | ThemeProvider/hook e persistência |
| RF-15 | UI responsiva | Verificação em viewports |
| RF-16 | Branding | Assets, favicon e seção no README |
