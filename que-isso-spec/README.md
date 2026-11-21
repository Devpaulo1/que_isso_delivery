# QuE IssO — Projeto Final SPA

SPA de e-commerce fictício para cafeteria, desenvolvida com React, TypeScript e Vite como projeto final da disciplina SPA.

> Este repositório começa pela especificação. Consulte os documentos antes de implementar funcionalidades.

## Documentação do projeto

- [AGENTS.md](./AGENTS.md) — regras para assistentes de IA.
- [PRD_SPEC](./docs/PRD_SPEC.md) — objetivos, escopo, requisitos e critérios de aceite.
- [TECH_SPEC](./docs/TECH_SPEC.md) — stack, arquitetura, modelos, estado, integrações e testes.
- [TASKS_SPEC](./docs/TASKS_SPEC.md) — tarefas incrementais e critérios de conclusão.
- [AI_USAGE](./docs/AI_USAGE.md) — registro obrigatório de uso de IA.

## Fluxo do produto

Home → Checkout → Confirmação do pedido.

O usuário consulta cafés, escolhe quantidades, gerencia o carrinho, informa endereço, consulta CEP por API pública, seleciona pagamento fictício e visualiza o pedido confirmado.

## Escopo técnico previsto

- React + Vite + TypeScript
- React Router
- Context API + useReducer
- React Hook Form + Zod
- styled-components
- localStorage
- ViaCEP
- Vitest + React Testing Library

Não há backend, autenticação, banco de dados próprio nem pagamento real.

## Referências

- [Figma — QuE IssO Projeto Final React](https://www.figma.com/design/yGPNTA0Yczb183EikXGIiA/Coffee-Delivery-%E2%80%A2-Projeto-Final-React?node-id=217-511&t=ojymzxreqtuCt0uo-0)
- [ViaCEP](https://viacep.com.br/)
- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

## Status

**Fase atual:** especificação e aprovação. Nenhuma tarefa de implementação deve ser considerada concluída apenas porque está listada no TASKS_SPEC.

## Instalação e execução

Os comandos serão definidos após a criação do projeto e instalação das dependências. Quando disponíveis, os comandos esperados serão:

```bash
npm install
npm run dev
npm run test
npm run lint
npm run typecheck
npm run build
```

Não execute comandos que ainda não estejam configurados no `package.json`.

## Branding com IA

Esta seção deve ser completada após a criação e aprovação da identidade visual.

- **Nome da marca:**
- **Conceito:**
- **Ferramenta de IA utilizada:**
- **Prompt utilizado:**
- **Proposta escolhida:**
- **Justificativa da escolha:**
- **Paleta de cores:**
- **Tipografia:**
- **Variações para fundo claro/escuro:**
- **Arquivos da logo e favicon:**
- **Verificação de legibilidade e direitos de uso:**

## Uso de IA no desenvolvimento

Registrar pelo menos três interações reais em [docs/AI_USAGE.md](./docs/AI_USAGE.md), incluindo prompt, objetivo, resumo, decisão humana e evidência.

## Processo de desenvolvimento

1. Ler e aprovar PRD, TECH e TASKS.
2. Executar uma tarefa pequena por vez.
3. Validar a implementação e os testes.
4. Atualizar checklist e documentação.
5. Criar commit semântico.
6. Revisar o fluxo completo antes da entrega.

Consulte [AGENTS.md](./AGENTS.md) para as regras obrigatórias dos agentes.
