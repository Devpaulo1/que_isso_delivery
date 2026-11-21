---
title: "QuE IssO — Product Requirements Specification"
version: "1.0.0"
status: "Implemented — pending student review"
owner: "Estudante responsável pelo projeto"
product: "QuE IssO"
last_updated: "2026-11-17"
---

# PRD_SPEC — QuE IssO

## 1. Visão geral

QuE IssO é uma aplicação SPA de e-commerce fictício para uma cafeteria, adaptada do desafio QuE IssO da formação React 2022 para o projeto final da disciplina SPA.

O cliente deve consultar um catálogo de cafés, escolher quantidades, adicionar produtos ao carrinho, revisar valores, informar endereço de entrega, selecionar uma forma de pagamento fictícia e visualizar a confirmação do pedido.

A aplicação é uma experiência de front-end. Não existe transação financeira, backend, autenticação ou banco de dados próprio.

## 2. Problema e oportunidade

O projeto oferece um cenário prático e integrado para demonstrar domínio de fundamentos modernos de desenvolvimento front-end. O desafio não é apenas exibir telas, mas garantir consistência entre catálogo, quantidades, carrinho, cálculos, formulário, navegação, persistência e confirmação.

## 3. Objetivos

- Entregar o fluxo de compra fictícia de ponta a ponta.
- Demonstrar domínio de React, TypeScript, componentes, Props, Hooks e composição.
- Gerenciar o carrinho com Context API e `useReducer`.
- Aplicar imutabilidade e métodos de arrays.
- Implementar rotas sem recarregamento completo.
- Validar o checkout com React Hook Form e Zod.
- Consultar obrigatoriamente uma API pública de CEP.
- Persistir carrinho e preferência de tema no navegador.
- Implementar temas claro/escuro e layout responsivo.
- Criar uma identidade visual original com apoio de ferramenta de IA.
- Demonstrar qualidade por meio de testes, documentação e commits.

## 4. Público-alvo e personas

**Cliente da cafeteria:** pessoa que deseja escolher cafés, definir quantidades, informar endereço e concluir um pedido fictício com poucos passos.

**Estudante/avaliador:** pessoa que precisa compreender a arquitetura, verificar os requisitos e observar a aplicação dos conceitos exigidos na disciplina.

## 5. Escopo

### 5.1 Dentro do escopo

- Catálogo local tipado de cafés.
- Cards com imagem, nome, descrição, preço e tags/categorias.
- Seleção de quantidade e inclusão no carrinho.
- Carrinho com incremento, decremento e remoção.
- Contador de unidades no Header.
- Persistência do carrinho com `localStorage`.
- Rotas Home, Checkout e Success.
- Formulário de endereço com validação.
- Consulta ViaCEP obrigatória.
- Seleção de crédito, débito ou dinheiro, sem cobrança.
- Cálculo de subtotal, taxa e total.
- Snapshot independente do pedido confirmado.
- Estado vazio e feedback de erro.
- Light mode e dark mode persistidos.
- Layout responsivo e acessível.
- Logo original criada com auxílio de IA e documentação da marca.
- Testes automatizados dos fluxos e regras principais.
- Documentação SPEC e registro do uso de IA.

### 5.2 Fora do escopo

- Backend ou API própria.
- Banco de dados remoto.
- Cadastro, login, autenticação ou autorização.
- Gateway ou processamento real de pagamentos.
- Integração com entregadores, rastreamento ou logística real.
- Painel administrativo.
- Gestão de estoque em tempo real.
- Cadastro/edição de produtos pela interface.
- Envio real de e-mail, SMS ou notificações.
- Cálculo de frete por distância ou integração logística.
- Conta de usuário e histórico remoto de pedidos.

## 6. Fluxos de usuário

### FL-01 — Comprar cafés

1. Usuário acessa `/`.
2. Visualiza catálogo.
3. Seleciona quantidade inteira positiva em um card.
4. Adiciona o café ao carrinho.
5. Se o produto já existir, sua quantidade é acumulada na mesma linha.
6. Header atualiza o contador pela soma de unidades.
7. Usuário acessa `/checkout`.

### FL-02 — Revisar carrinho

1. Usuário visualiza os itens e quantidades.
2. Pode aumentar, diminuir ou remover cada item.
3. Subtotal, taxa e total são recalculados.
4. Se não houver itens, a interface apresenta estado vazio e impede finalizar.

### FL-03 — Informar endereço e pagamento

1. Usuário informa CEP.
2. A aplicação consulta ViaCEP.
3. Para CEP válido e encontrado, preenche rua/logradouro, bairro, cidade e UF quando disponíveis.
4. Usuário informa número e, opcionalmente, complemento.
5. Usuário seleciona crédito, débito ou dinheiro.
6. A aplicação valida os campos e apresenta erros acessíveis.

### FL-04 — Confirmar pedido

1. A aplicação confirma que o carrinho contém produtos válidos.
2. Confere formulário e forma de pagamento.
3. Calcula valores finais.
4. Cria snapshot independente do pedido.
5. Limpa o carrinho persistido.
6. Navega para `/success`.
7. Exibe endereço, pagamento e resumo do pedido concluído.

### FL-05 — Alternar tema

1. Usuário aciona controle de tema.
2. Toda a interface muda para o tema escolhido.
3. A preferência fica persistida após refresh.

### FL-06 — Acessar confirmação sem pedido

1. Usuário acessa `/success` diretamente ou sem pedido válido.
2. A aplicação apresenta estado vazio/aviso de confirmação indisponível.
3. Oferece caminho claro para voltar à Home.

## 7. Requisitos funcionais

Os IDs abaixo são contratos estáveis. Mudanças devem ser refletidas no TECH_SPEC e TASKS_SPEC.

| ID | Requisito | Critério de aceite |
|---|---|---|
| RF-01 | Exibir catálogo de cafés | Cada produto apresenta imagem, nome, descrição, preço e categoria/tag na Home. |
| RF-02 | Selecionar quantidade antes de adicionar | Controles aceitam somente inteiros positivos; não permitem adicionar quantidade zero ou negativa. |
| RF-03 | Adicionar e acumular produto repetido | Adicionar o mesmo café atualiza a quantidade existente, sem duplicar linha. |
| RF-04 | Exibir contador de unidades no Header | O contador representa a soma das quantidades de todos os itens, não a quantidade de tipos. |
| RF-05 | Alterar e remover itens | Incrementar, decrementar e remover atualizam itens, totais e contador imediatamente. Ao decrementar de 1, o item é removido. |
| RF-06 | Persistir carrinho | Após refresh, carrinho válido é recuperado do `localStorage`; dados inválidos são tratados com segurança. |
| RF-07 | Navegar com React Router | Rotas `/`, `/checkout` e `/success` funcionam sem recarregamento completo. |
| RF-08 | Preencher e validar endereço | CEP consulta obrigatoriamente API pública; preenche logradouro, bairro, cidade e UF quando disponíveis. Número e complemento são manuais. Há feedback para CEP inválido, não encontrado, carregamento e falha da API. |
| RF-09 | Selecionar pagamento | Crédito, débito ou dinheiro; uma opção válida é obrigatória. |
| RF-10 | Exibir valores | Subtotal, taxa de entrega e total são consistentes e exibidos em BRL com duas casas. |
| RF-11 | Impedir pedido inválido | Não finaliza com carrinho vazio, produto inexistente, endereço inválido ou pagamento ausente; informa erros de forma acessível. |
| RF-12 | Confirmar pedido fictício | Sucesso exibe endereço, pagamento e resumo coerentes com os dados enviados. |
| RF-13 | Limpar carrinho e preservar pedido | Após confirmação, carrinho fica vazio, mas snapshot do pedido concluído permanece disponível na tela de sucesso. |
| RF-14 | Alternar tema | Light/dark é aplicado em todas as telas e preferência persiste após refresh. |
| RF-15 | Responsividade | Home, Header, cards, carrinho, formulário e confirmação funcionam em telas pequenas sem perda do fluxo. |
| RF-16 | Integrar logo original com IA | Logo criada com ferramenta de IA aparece no Header e favicon; arquivos e processo são documentados. |

## 8. Regras de negócio

- **RN-01 — Quantidades:** operações de adição aceitam somente inteiros positivos. No carrinho, decrementar de 1 remove o item.
- **RN-02 — Produto único:** cada produto aparece no máximo uma vez no carrinho; nova adição acumula quantidade.
- **RN-03 — Cálculo:** `subtotal = soma(preçoUnitárioEmCentavos × quantidade)`. `total = subtotal + taxaEntrega`. A taxa é fixa e fictícia: **R$ 5,00 (500 centavos)** (DP-02 aprovada), definida em uma única constante configurável.
- **RN-04 — Dinheiro:** valores são representados internamente em centavos inteiros e formatados para BRL com duas casas decimais.
- **RN-05 — Pagamento:** seleção é informativa; nenhuma transação é iniciada.
- **RN-06 — Persistência:** carrinho sobrevive a refresh. Pedido confirmado é um snapshot independente do carrinho, criado antes da limpeza.
- **RN-07 — Endereço:** complemento é opcional. CEP deve ser validado e consultado em API pública. Número, complemento e campos não fornecidos pela API são preenchidos manualmente. A aplicação trata CEP inválido, não encontrado, loading, erro de rede e indisponibilidade.
- **RN-08 — Dados:** catálogo é local e tipado. Não é necessário backend; API pública de CEP é obrigatória.
- **RN-09 — Estados vazios:** apresentar estado vazio quando carrinho estiver sem itens e quando não existir pedido válido para confirmação.
- **RN-10 — Navegação e integridade:** não permitir confirmar com erros de validação, carrinho vazio ou referências a produtos inexistentes.

## 9. Requisitos não funcionais

### RNF-01 — Acessibilidade
- Elementos interativos devem ser utilizáveis por teclado.
- Foco deve ser visível.
- Inputs devem possuir labels e mensagens de erro associadas.
- Contraste deve ser adequado nos dois temas.
- Estados não devem depender exclusivamente de cor.
- Usar semântica HTML apropriada e atributos ARIA somente quando necessários.

### RNF-02 — Responsividade
- Interface utilizável em larguras móveis, tablets e desktop.
- Sem rolagem horizontal indevida.
- Alvos de toque adequados e controles não sobrepostos.

### RNF-03 — Desempenho
- Evitar renders e cálculos desnecessários.
- Imagens devem ter dimensões e fallback adequados.
- Não carregar bibliotecas sem necessidade justificada.

### RNF-04 — Confiabilidade
- Tratar indisponibilidade de ViaCEP.
- Tratar JSON inválido ou versão incompatível no localStorage.
- Não perder snapshot de pedido no momento de limpar carrinho.
- Evitar valores monetários de ponto flutuante.

### RNF-05 — Compatibilidade
- Suporte às versões atuais de navegadores Chromium, Firefox e Safari.
- Layout adaptável a dispositivos móveis modernos.

### RNF-06 — Manutenibilidade
- TypeScript strict.
- Componentes com responsabilidade delimitada.
- Regras de negócio testáveis fora da UI.
- Documentação atualizada junto às mudanças.

### RNF-07 — Privacidade
- Não solicitar dados além do necessário ao pedido fictício.
- Endereço permanece no navegador; explicar na documentação que não há envio para servidor próprio.
- Não registrar endereço ou dados pessoais em logs desnecessários.

## 10. Identidade visual e Branding com IA

A referência original utiliza amarelo e roxo, Baloo 2 para títulos e Roboto para textos. O estudante pode criar marca autoral, desde que mantenha o propósito de cafeteria e a clareza do fluxo.

Entrega obrigatória:
1. Gerar pelo menos uma proposta original de logo com ferramenta de IA.
2. Registrar ferramenta, prompt utilizado, resultado escolhido e justificativa.
3. Definir conceito da marca, paleta, tipografia e versões para fundos claros/escuros.
4. Integrar logo no Header e preparar favicon.
5. Salvar arquivos em `src/assets/` ou `public/`.
6. Verificar legibilidade em tamanhos reduzidos e direitos de uso.
7. Criar seção “Branding com IA” no README ou documentação.

**Status:** direção aprovada (T-010); logo gerada em T-011.

### 10.1 Direção da marca (T-010)

- **Nome:** QuE IssO (DP-01).
- **Personalidade:** acolhedora, rápida e confiável — “café quentinho na sua porta”.
- **Conceito do símbolo:** xícara de café cujo vapor forma um pin de localização, unindo **café** e **entrega**.
- **Direção visual:** amarelo (energia, café quente) e roxo (sofisticação), herdados da referência; formas arredondadas, cantos suaves e ícones simples.
- **Tipografia:** Baloo 2 (títulos, peso 700/800) e Roboto (textos, 400/700).
- **Tom de voz:** direto e amigável, em português, frases curtas.

## 11. Critérios gerais de aceite

- Todos os RF-01 a RF-16 implementados e demonstráveis.
- Todas as RN-01 a RN-10 respeitadas.
- Fluxo Home → Checkout → Success funcional.
- ViaCEP integrado e com estados de falha.
- Carrinho e tema persistidos.
- Pedido concluído independente do carrinho.
- Temas claro/escuro coerentes.
- Layout responsivo e acessível.
- Testes cobrindo cálculos, reducer, validação, CEP e fluxos críticos.
- README, SPEC e registro de IA atualizados.
- Estudante consegue explicar arquitetura, estado global e principais decisões.

## 12. Decisões pendentes / pontos de validação humana

| ID | Tema | Proposta atual | Estado |
|---|---|---|---|
| DP-01 | Nome da marca | QuE IssO (nome mantido; logo autoral) | Adotado pela IA — pendente de revisão do estudante |
| DP-02 | Taxa de entrega | R$ 5,00 fixa (500 centavos) em `src/config/constants.ts` | Adotado pela IA — pendente de revisão do estudante |
| DP-03 | Decremento para zero | Remover item ao decrementar de 1 | Adotado pela IA — pendente de revisão do estudante |
| DP-04 | Estilização | styled-components com ThemeProvider | Adotado pela IA — pendente de revisão do estudante |
| DP-05 | Logo e identidade | Logo SVG gerada com IA (Claude) e documentada no README | Adotado pela IA — pendente de revisão do estudante |
| DP-06 | Catálogo e imagens | Dados locais tipados; ilustrações PNG originais do projeto em `src/assets/img/` (sem licença de terceiros) | Adotado pela IA — pendente de revisão do estudante |
| DP-07 | Figma | Figma não acessível ao agente nesta sessão; layout segue a descrição textual da spec (amarelo/roxo, Baloo 2/Roboto, Home → Checkout → Success). Medidas exatas não foram inspecionadas | Mantido como limitação documentada |

## 13. Referências

- Figma: https://www.figma.com/design/yGPNTA0Yczb183EikXGIiA/Coffee-Delivery-%E2%80%A2-Projeto-Final-React?node-id=217-511&t=ojymzxreqtuCt0uo-0
- ViaCEP: https://viacep.com.br/
- React: https://react.dev/
- React Router: https://reactrouter.com/
- React Hook Form: https://react-hook-form.com/
- Zod: https://zod.dev/

## 14. Registro de revisão do PRD (T-001)

Revisão realizada em 2026-11-17 pela IA (Claude Code), a pedido do estudante, que solicitou a implementação completa a partir desta especificação. A revisão humana do PRD ainda deve ser feita pelo estudante.

- [x] Escopo (dentro/fora) revisado — sem inclusão de backend, autenticação ou pagamento real.
- [x] Fluxos FL-01 a FL-06 revisados e mantidos.
- [x] RF-01 a RF-16 revisados; critérios de aceite mantidos como contrato.
- [x] RN-01 a RN-10 revisadas.
- [x] RNF-01 a RNF-07 revisados.
- [x] Decisões pendentes DP-01 a DP-07 identificadas (resolução registrada em T-003).
