# AGENTS.md — QuE IssO

> Instruções permanentes para qualquer agente de IA que trabalhe neste repositório.
> Fonte de verdade do produto: `spec/prd-spec.md`. Fonte de verdade técnica: `spec/tech-spec.md`.
> Plano executável: `spec/task-spec.md`.

## 1. Missão do agente

Implementar e manter o QuE IssO como uma Single Page Application educacional de e-commerce fictício, respeitando os requisitos, decisões e critérios documentados. O objetivo é demonstrar domínio de React, TypeScript, componentes, Props, Hooks, Context API, `useReducer`, imutabilidade, arrays, rotas, formulários, persistência local, responsividade, acessibilidade, testes e documentação.

## 2. Ordem de leitura obrigatória

Antes de qualquer alteração relevante:

1. Leia este arquivo.
2. Leia `spec/prd-spec.md` para entender comportamento, escopo e critérios de aceite.
3. Leia `spec/tech-spec.md` para respeitar arquitetura, contratos, convenções e decisões técnicas.
4. Consulte `spec/task-spec.md` e execute apenas tarefas autorizadas/prontas, respeitando dependências.
5. Se houver divergência entre código e especificação, não presuma qual está correta: identifique a divergência e proponha a atualização necessária.

## 3. Regras invioláveis

- Não criar backend, autenticação, banco de dados ou integração de pagamento real.
- Não remover nem simplificar o fluxo Home → Checkout → Confirmação.
- A consulta pública de CEP (ViaCEP ou alternativa aprovada) é obrigatória no checkout.
- Não inventar dados de API, endereços, produtos ou resultados de consulta.
- Não permitir carrinho com quantidades zero/negativas, linhas duplicadas do mesmo produto ou valores monetários inconsistentes.
- Não armazenar dinheiro em ponto flutuante para cálculos. Usar centavos inteiros.
- Não mutar estado, arrays ou objetos existentes. Reducers devem ser puros e imutáveis.
- Não duplicar regras de negócio em componentes. Centralizar cálculos, constantes e validações nos módulos definidos.
- Não usar `any` sem justificativa técnica documentada.
- Não deixar erros de TypeScript, lint ou testes conhecidos sem registrar o motivo.
- Não adicionar dependências sem justificar o benefício e atualizar a documentação.
- Não afirmar que uma funcionalidade está pronta sem evidência de implementação e validação.

## 4. Processo de trabalho

Para cada funcionalidade:

1. Identifique os RF/RN relacionados no PRD.
2. Confirme o desenho técnico correspondente no TechSpec.
3. Localize a tarefa correspondente no TaskSpec.
4. Implemente a menor unidade vertical funcional possível.
5. Escreva ou atualize testes derivados dos critérios de aceite.
6. Execute typecheck, lint e testes relevantes.
7. Marque a tarefa como concluída somente após validação.
8. Atualize os documentos se uma decisão aprovada mudar.

Não avance para uma tarefa dependente enquanto seus pré-requisitos não estiverem concluídos.

## 5. Padrões de código

- TypeScript em modo estrito.
- Componentes funcionais e Hooks.
- Componentes pequenos, com responsabilidade única e Props explícitas.
- Nomes de componentes e tipos em PascalCase; funções, variáveis e arquivos utilitários em camelCase.
- Constantes globais em SCREAMING_SNAKE_CASE quando apropriado.
- Imports organizados e caminhos consistentes.
- Preferir funções puras para cálculos e transformações.
- Separar apresentação, estado, regras de domínio, infraestrutura e dados.
- Usar `React.memo`, `useMemo` e `useCallback` apenas quando houver motivo mensurável ou estabilidade de referência necessária.

## 6. Estado e persistência

- Carrinho: Context API + `useReducer`.
- O reducer recebe ações explícitas e retorna novo estado.
- `localStorage` é acessado por uma camada de persistência, nunca espalhado pelos componentes.
- Validar/normalizar dados recuperados do `localStorage`; tratar JSON inválido e versão incompatível.
- Tema: preferência persistida localmente e aplicada por atributo/classe no elemento raiz.
- Pedido concluído: snapshot independente do carrinho e persistido separadamente, para que limpar o carrinho não apague a confirmação.

## 7. Integrações e segurança

- ViaCEP é uma API pública externa; tratar loading, erro de rede, CEP inválido, CEP não encontrado e resposta sem campos.
- Evitar condições de corrida em consultas de CEP: uma resposta antiga não pode sobrescrever a consulta mais recente.
- Não registrar endereço completo em logs.
- Não coletar dados além dos necessários para simular o pedido.
- Pagamento é somente uma escolha informativa; nunca solicitar dados de cartão.

## 8. Qualidade, testes e acessibilidade

- Testar reducers, seletores, cálculos monetários e validações.
- Testar fluxos críticos: adicionar/remover produto, persistir carrinho, consultar CEP, validar checkout e concluir pedido.
- Usar testes de componentes com React Testing Library e testes de integração com mocks de API.
- Garantir labels associados, mensagens de erro compreensíveis, foco visível, navegação por teclado e anúncios acessíveis para feedback dinâmico.
- Respeitar `prefers-reduced-motion` e contraste adequado nos dois temas.
- Layout deve funcionar em mobile, tablet e desktop.

## 9. Design e identidade visual

- Usar o Figma de referência como guia visual: https://www.figma.com/design/yGPNTA0Yczb183EikXGIiA/Coffee-Delivery-%E2%80%A2-Projeto-Final-React?node-id=217-511
- O Figma não pôde ser inspecionado automaticamente durante a criação destes documentos por restrição de permissão. Não inventar medidas, espaçamentos ou tokens exatos; validar manualmente com o arquivo quando houver acesso.
- Identidade deve preservar o propósito de cafeteria, ter temas claro/escuro coerentes e manter clareza funcional.
- A logo deve ser original, gerada com ferramenta de IA, revisada por uma pessoa e documentada no README na seção “Branding com IA”, incluindo ferramenta, prompt real utilizado, resultado, justificativa e direitos de uso.
- Não declarar que a logo foi gerada até que o arquivo final esteja no repositório.

## 10. Definition of Done

Uma tarefa só está concluída quando:

- [ ] Critérios de aceite relacionados foram atendidos.
- [ ] Não há regressão no fluxo principal.
- [ ] Testes relevantes passam.
- [ ] TypeScript e lint passam.
- [ ] Estados de loading, erro e vazio foram considerados quando aplicável.
- [ ] Acessibilidade e responsividade foram verificadas.
- [ ] Documentação e TaskSpec foram atualizados.
- [ ] Não há TODO crítico ou comportamento simulado apresentado como integração real.

## 11. Comunicação do agente

Ao finalizar uma etapa, informe: o que foi alterado, RF/RN atendidos, arquivos relevantes, testes executados e limitações restantes. Se faltar informação que altere uma decisão de produto ou arquitetura, pergunte antes de assumir.
