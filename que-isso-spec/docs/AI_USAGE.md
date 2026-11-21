# AI_USAGE — Registro de uso de Inteligência Artificial

Este documento registra o uso de assistentes de IA durante planejamento, implementação, revisão, depuração e testes do QuE IssO.

A IA é ferramenta de apoio. O estudante deve revisar as respostas, tomar as decisões e compreender o código produzido.

## Registro obrigatório

Registrar pelo menos três interações relevantes. Não preencher retroativamente com atividades que não ocorreram. Substituir os campos abaixo por evidências reais durante o desenvolvimento.

### Interação 01 — Planejamento e análise de requisitos

- **Data:**
- **Ferramenta/modelo:**
- **Prompt utilizado:**
- **Objetivo:**
- **Resumo da resposta:**
- **Decisão tomada pelo estudante:**
- **O que foi alterado nos SPEC/código:**
- **Evidência:** link, screenshot, commit ou trecho relevante.

### Interação 02 — Arquitetura/React e estado global

- **Data:**
- **Ferramenta/modelo:**
- **Prompt utilizado:**
- **Objetivo:**
- **Resumo da resposta:**
- **Decisão tomada pelo estudante:**
- **O que foi alterado nos SPEC/código:**
- **Evidência:** link, screenshot, commit ou trecho relevante.

### Interação 03 — Testes, revisão ou depuração

- **Data:**
- **Ferramenta/modelo:**
- **Prompt utilizado:**
- **Objetivo:**
- **Resumo da resposta:**
- **Decisão tomada pelo estudante:**
- **O que foi alterado nos SPEC/código:**
- **Evidência:** link, screenshot, commit ou trecho relevante.

## Interações adicionais

Adicionar novas entradas com os mesmos campos.

### Interação 04 — Geração da logo com IA (T-011)

- **Data:** 2026-11-17
- **Ferramenta/modelo:** Claude Code com Claude Opus 5.5 (geração de SVG vetorial).
- **Prompt utilizado:** "Crie uma logo SVG original e simples para a cafeteria QuE IssO: uma xícara amarela (#DBAC2C) sobre um pires roxo, cujo vapor forma um pin de localização roxo (#8047F8). Deve funcionar em 16px e ter variação para fundo escuro."
- **Objetivo:** criar o símbolo da marca para Header e favicon (RF-16).
- **Resumo da resposta:** a IA gerou um SVG 64×64 com pin de localização (vapor), xícara com alça, borda mais escura e pires, além de uma variante para fundo escuro com cores ajustadas.
- **Decisão tomada pelo estudante:** aprovar o símbolo; manter o nome “QuE IssO” como texto em Baloo 2 ao lado do símbolo, em vez de texto dentro do SVG (fontes não carregam em `<img>`).
- **O que foi alterado nos SPEC/código:** `src/assets/Log/logo-light.svg`, `logo-dark.svg`, README (Branding com IA).
- **Evidência:** commit `feat: integrar assets de marca existentes`.


## Boas práticas

- Registrar prompts reais, sem inventar conversas.
- Informar quando uma sugestão da IA foi rejeitada ou modificada.
- Não incluir tokens, senhas, chaves ou dados pessoais.
- Preservar evidências verificáveis.
- Explicar como a resposta foi validada.
