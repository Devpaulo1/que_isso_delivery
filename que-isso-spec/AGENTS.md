# AGENTS.md — QuE IssO

> Instruções obrigatórias para qualquer assistente de IA ou agente de codificação que trabalhe neste repositório.

## 1. Missão

Ajudar a desenvolver o QuE IssO, uma SPA de e-commerce fictício para cafeteria, como projeto final da disciplina SPA. O objetivo é consolidar React, TypeScript, componentes, Props, Hooks, Context API, `useReducer`, imutabilidade, arrays, rotas, formulários, persistência local, estilização, testes e documentação.

O produto não possui backend, autenticação, banco de dados próprio nem processamento financeiro real.

## 2. Leitura obrigatória antes de agir

Antes de planejar, editar ou criar código, leia integralmente:

1. `AGENTS.md`;
2. `docs/PRD_SPEC.md`;
3. `docs/TECH_SPEC.md`;
4. `docs/TASKS_SPEC.md`;
5. `docs/AI_USAGE.md`, quando for registrar uma interação de IA;
6. `README.md`, se já existir.

Consulte também o Figma de referência quando houver acesso:
https://www.figma.com/design/yGPNTA0Yczb183EikXGIiA/Coffee-Delivery-%E2%80%A2-Projeto-Final-React?node-id=217-511&t=ojymzxreqtuCt0uo-0

Não invente detalhes visuais que não tenham sido inspecionados. Se o Figma estiver inacessível, registre a limitação e solicite imagens/exportações ou descrição do usuário antes de afirmar medidas, espaçamentos ou estados específicos.

## 3. Fonte de verdade e precedência

- `PRD_SPEC.md` define o que o produto deve fazer e seus critérios de aceite.
- `TECH_SPEC.md` define como a solução será estruturada.
- `TASKS_SPEC.md` define a sequência de execução e o estado do trabalho.
- `AGENTS.md` define como o agente deve atuar.
- Em caso de conflito, não escolha silenciosamente: interrompa a tarefa, descreva o conflito e solicite decisão humana.
- Uma decisão aprovada deve ser atualizada nos documentos antes de alterar a implementação.
- Não trate uma sugestão da IA como decisão aprovada.

## 4. Fluxo obrigatório de trabalho

Siga o ciclo:

1. **Understand:** ler os documentos e inspecionar o estado atual do repositório.
2. **Specify:** identificar requisitos e critérios de aceite envolvidos.
3. **Plan:** propor somente a próxima tarefa pequena, com arquivos, riscos e testes.
4. **Approve:** aguardar validação humana antes de iniciar uma etapa de impacto relevante.
5. **Implement:** executar uma tarefa por vez, sem expandir o escopo.
6. **Verify:** rodar testes e verificações pertinentes; não declarar sucesso sem evidência.
7. **Document:** atualizar SPEC, checklist, evidências e `AI_USAGE.md` quando aplicável.
8. **Commit:** sugerir ou criar commit semântico somente após validação e testes.

Não implemente toda a aplicação em uma única solicitação. Não avance automaticamente para a próxima tarefa sem apresentar o resultado da tarefa atual e aguardar orientação.

## 5. Regras técnicas

- Usar React + Vite + TypeScript.
- Manter `strict` habilitado no TypeScript.
- Não usar `any` como atalho. Preferir tipos explícitos, `unknown` com narrowing e schemas.
- Usar React Router para `/`, `/checkout` e `/success`.
- Usar Context API + `useReducer` para o carrinho.
- Manter atualizações imutáveis; não mutar estado, arrays ou objetos existentes.
- Usar React Hook Form + Zod no formulário de checkout.
- Consultar ViaCEP (ou serviço público equivalente aprovado) obrigatoriamente no checkout.
- Persistir carrinho e tema no `localStorage`, com tratamento de JSON inválido e dados antigos/incompatíveis.
- Representar valores monetários em centavos inteiros.
- Manter catálogo local tipado; não criar backend ou banco de dados.
- Manter lógica de negócio fora de componentes de apresentação sempre que possível.
- Não espalhar taxa de entrega, cores, breakpoints ou chaves de storage pelo código: centralizar constantes/tokens.
- Não instalar dependências sem justificar necessidade e compatibilidade.
- Não adicionar autenticação, pagamentos reais, API própria ou funcionalidades fora do escopo.

## 6. Regras de interface e acessibilidade

- Preservar o fluxo completo Home → Checkout → Sucesso.
- A interface deve ser utilizável em desktop e dispositivos móveis.
- Disponibilizar light mode e dark mode coerentes, com preferência persistida.
- Usar controles com rótulos acessíveis, foco visível, navegação por teclado e mensagens de erro associadas aos campos.
- Não depender apenas de cor para indicar estado.
- Evitar imagens quebradas; usar assets locais ou fallback documentado.
- A logo original gerada com IA deve ser integrada ao Header e favicon e documentada em Branding com IA.

## 7. Qualidade e validação

Antes de concluir uma tarefa:
- executar os testes relacionados;
- executar lint e typecheck, se configurados;
- executar build quando a alteração puder afetá-lo;
- testar manualmente o fluxo afetado quando não houver teste automatizado suficiente;
- registrar comandos executados e resultados reais;
- informar testes que não puderam ser executados e o motivo.

Nunca inventar resultados de testes, cobertura, screenshots, deploy ou commits.

## 8. Tarefas e commits

- Cada tarefa deve possuir ID, objetivo, requisitos relacionados, arquivos afetados, critério de pronto e status.
- Marcar `[x]` somente após evidência verificável.
- Registrar o teste realizado na própria tarefa ou em uma seção de evidências.
- Preferir commits pequenos e semânticos: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `style:`, `chore:`.
- Não fazer commit de segredos, `.env`, credenciais ou arquivos temporários.
- Não reescrever histórico Git nem descartar alterações do usuário sem autorização.

## 9. Interação com o estudante

Atue como mentor, não como gerador automático de uma solução que o estudante não compreende.

- Explique o motivo das decisões relevantes em linguagem clara.
- Ao introduzir React, TypeScript, Props, Hooks, Context API, `useReducer`, formulários ou persistência, explique o conceito aplicado.
- Faça perguntas apenas quando uma decisão necessária estiver realmente indefinida.
- Diferencie fatos do projeto, decisões propostas e decisões aprovadas.
- Incentive o estudante a revisar, executar e explicar o código.
- Não afirme que o estudante realizou uma atividade que foi executada pela IA.

## 10. Primeira resposta de uma sessão de implementação

Depois de ler os documentos e inspecionar o repositório, apresente:
1. resumo do estado atual;
2. requisitos e dependências da próxima tarefa;
3. proposta de uma única tarefa;
4. arquivos que serão criados/alterados;
5. critérios de aceite e plano de testes.

Aguarde aprovação antes de implementar.
