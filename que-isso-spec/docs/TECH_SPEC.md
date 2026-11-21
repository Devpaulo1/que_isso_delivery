---
title: "QuE IssO — Technical Specification"
version: "1.0.0"
status: "Implemented — pending student review"
last_updated: "2026-11-17"
---

# TECH_SPEC — QuE IssO

## 1. Objetivo técnico

Definir a arquitetura de uma SPA React para atender aos requisitos do `docs/PRD_SPEC.md`, com separação de responsabilidades, tipagem estrita, estado previsível, persistência local, integração pública de CEP e testes.

A implementação deve permanecer simples o suficiente para um projeto acadêmico, sem introduzir backend ou infraestrutura desnecessária.

## 2. Stack

| Tecnologia | Responsabilidade | Justificativa |
|---|---|---|
| React | UI e composição de componentes | Base do projeto e foco da disciplina |
| Vite | Dev server e build | Ferramenta moderna e simples para SPA |
| TypeScript | Tipagem estática | Evitar inconsistências e `any` |
| React Router | Rotas | Navegação SPA |
| Context API | Compartilhar estado | Disponibilizar carrinho e tema |
| useReducer | Transições do carrinho | Ações explícitas e atualizações previsíveis |
| React Hook Form | Estado do formulário | Gerenciar campos e submissão |
| Zod | Schema e validação | Regras tipadas e mensagens consistentes |
| styled-components | Estilização | Alinhado ao desafio de origem e temas via ThemeProvider |
| localStorage | Persistência | Carrinho, tema e snapshot do último pedido |
| Vitest | Test runner | Integrado ao ecossistema Vite |
| React Testing Library | Testes de UI | Verificar comportamento percebido pelo usuário |
| MSW (opcional) | Mock de ViaCEP | Simular sucesso e falhas de rede sem depender do serviço externo |

**Regra:** confirmar versões compatíveis no momento da instalação. Não fixar versões desatualizadas por cópia de exemplos. Registrar versões efetivas no `package.json` e README.

## 3. Arquitetura da SPA

Arquitetura em camadas leves, orientada por funcionalidades:

- **App / routing:** composição da aplicação, providers e rotas.
- **Pages:** composição das telas e coordenação do fluxo.
- **Components:** elementos reutilizáveis de UI.
- **Contexts / reducers:** estado compartilhado e transições.
- **Hooks:** comportamento reutilizável e efeitos.
- **Services:** integração externa (ViaCEP).
- **Schemas:** validação de dados de formulário.
- **Utils:** cálculos puros e formatação.
- **Data:** catálogo local.
- **Types:** contratos TypeScript.
- **Styles:** tokens, temas e estilos globais.
- **Tests:** testes unitários, integração e comportamento.

### 3.1 Fluxo de composição

`main.tsx` → `App` → `BrowserRouter` + `ThemeProvider` + `CartProvider` → `Routes` → Pages.

Os providers devem envolver somente a parte da aplicação que necessita do estado. O carrinho e o tema devem estar disponíveis em Home, Checkout e Success.

### 3.2 Fluxo de dados do carrinho

`CoffeeCard` → ação `addItem` → `CartContext` → `cartReducer` → estado imutável → componentes consumidores → persistência.

A UI não altera arrays/objetos diretamente. O reducer recebe ação e estado anterior e retorna novo estado.

## 4. Estrutura de diretórios proposta

```text
que-isso/
├── public/
│   ├── favicon.svg
│   └── images/                  # somente se fizer sentido servir assets estáticos
├── src/
│   ├── assets/
│   │   ├── brand/
│   │   │   ├── logo-light.svg
│   │   │   └── logo-dark.svg
│   │   └── coffees/
│   ├── components/
│   │   ├── Header/
│   │   ├── ThemeToggle/
│   │   ├── CoffeeCard/
│   │   ├── CoffeeCatalog/
│   │   ├── QuantityInput/
│   │   ├── CartBadge/
│   │   ├── CartItem/
│   │   ├── CartSummary/
│   │   ├── DeliveryAddressForm/
│   │   ├── PaymentMethodSelector/
│   │   ├── OrderSuccess/
│   │   ├── EmptyCart/
│   │   └── PageLayout/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Checkout/
│   │   └── Success/
│   ├── contexts/
│   │   ├── CartContext/
│   │   └── ThemeContext/
│   ├── reducers/
│   │   └── cartReducer.ts
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useTheme.ts
│   │   └── useLocalStorage.ts
│   ├── services/
│   │   └── cep/
│   │       └── viaCep.ts
│   ├── data/
│   │   └── coffees.ts
│   ├── schemas/
│   │   └── checkoutSchema.ts
│   ├── types/
│   │   ├── coffee.ts
│   │   ├── cart.ts
│   │   ├── checkout.ts
│   │   └── order.ts
│   ├── utils/
│   │   ├── currency.ts
│   │   ├── cart.ts
│   │   └── storage.ts
│   ├── styles/
│   │   ├── themes.ts
│   │   ├── tokens.ts
│   │   └── GlobalStyle.ts
│   ├── tests/
│   │   ├── setup.ts
│   │   ├── fixtures/
│   │   └── helpers/
│   ├── config/
│   │   └── constants.ts         # taxa de entrega, limites e chaves de storage
│   ├── App.tsx
│   └── main.tsx
├── docs/
│   ├── PRD_SPEC.md
│   ├── TECH_SPEC.md
│   ├── TASKS_SPEC.md
│   └── AI_USAGE.md
├── AGENTS.md
├── README.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

A estrutura é orientativa. É permitido agrupar arquivos por feature, desde que a decisão seja documentada e as responsabilidades permaneçam claras. Evitar criar arquivos vazios apenas para reproduzir a árvore.

## 5. Modelos de domínio e tipos

Exemplo conceitual. Os nomes podem ser ajustados na implementação, mantendo os contratos.

```ts
export type CoffeeCategory =
  | 'traditional'
  | 'special'
  | 'with-milk'
  | 'alcoholic'
  | 'iced';

export interface Coffee {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  image: string;
  tags: string[];
  category: CoffeeCategory;
}

export interface CartItem {
  coffeeId: Coffee['id'];
  quantity: number;
}

export type PaymentMethod = 'credit' | 'debit' | 'cash';

export interface DeliveryAddress {
  postalCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface OrderItemSnapshot {
  coffeeId: string;
  name: string;
  unitPriceInCents: number;
  quantity: number;
  lineTotalInCents: number;
  image: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: OrderItemSnapshot[];
  address: DeliveryAddress;
  paymentMethod: PaymentMethod;
  subtotalInCents: number;
  deliveryFeeInCents: number;
  totalInCents: number;
}
```

**Importante:** o pedido deve armazenar nome, preço unitário, quantidade e total da linha no momento da confirmação. Não reconstruir o pedido consultando o carrinho depois de limpá-lo.

## 6. Estado global do carrinho

### 6.1 Estado

```ts
export interface CartState {
  items: CartItem[];
}
```

O catálogo permanece em `data/coffees.ts`. O carrinho armazena apenas `coffeeId` e `quantity`; a camada de domínio resolve os produtos a partir do catálogo tipado. Na criação do pedido, os dados relevantes são copiados para o snapshot.

### 6.2 Ações do reducer

```ts
export type CartAction =
  | { type: 'ADD_ITEM'; payload: { coffeeId: string; quantity: number } }
  | { type: 'INCREMENT_ITEM'; payload: { coffeeId: string } }
  | { type: 'DECREMENT_ITEM'; payload: { coffeeId: string } }
  | { type: 'REMOVE_ITEM'; payload: { coffeeId: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE_CART'; payload: CartItem[] };
```

Regras:
- `ADD_ITEM`: validar quantidade inteira positiva; acumular quando `coffeeId` já existir.
- `INCREMENT_ITEM`: incrementar item existente.
- `DECREMENT_ITEM`: decrementar; se quantidade chegar a zero, remover.
- `REMOVE_ITEM`: remover apenas o item correspondente.
- `CLEAR_CART`: retornar carrinho vazio.
- `HYDRATE_CART`: aceitar somente dados previamente normalizados/validados.

O reducer deve ser puro, determinístico e sem efeitos colaterais. Não acessar `localStorage`, gerar IDs ou consultar APIs dentro dele.

### 6.3 Context API

`CartProvider` expõe estado e operações de domínio, por exemplo:
- `items`;
- `addItem(coffeeId, quantity)`;
- `incrementItem(coffeeId)`;
- `decrementItem(coffeeId)`;
- `removeItem(coffeeId)`;
- `clearCart()`;
- `totalUnits`;
- `subtotalInCents`.

`useCart` encapsula `useContext` e lança erro claro se utilizado fora do provider.

## 7. Persistência

Chaves centralizadas, com namespace e versão:
- `que-isso:cart:v1`
- `que-isso:theme:v1`
- `que-isso:last-order:v1`

Regras:
- Inicializar estado a partir de dados parseados e validados.
- Proteger `JSON.parse` com `try/catch`.
- Descartar ou normalizar estrutura inválida; nunca assumir que storage é confiável.
- Persistir mudanças do carrinho e preferência de tema.
- Persistir snapshot do pedido antes de limpar o carrinho.
- Não salvar funções, objetos de erro ou estados transitórios.
- Não acessar `window` durante renderização em ambientes sem DOM, se a configuração futura exigir SSR; o projeto atual é SPA client-side.

`useLocalStorage` pode encapsular leitura/escrita, mas não deve esconder regras específicas de domínio.

## 8. Checkout, schema e ViaCEP

### 8.1 Formulário

Usar React Hook Form integrado ao Zod via resolver.

Campos:
- `postalCode`: CEP com 8 dígitos após normalização.
- `street`: obrigatório.
- `number`: obrigatório.
- `complement`: opcional.
- `neighborhood`: obrigatório.
- `city`: obrigatório.
- `state`: UF válida com 2 caracteres.
- `paymentMethod`: obrigatório e pertencente a `credit | debit | cash`.

Máscara visual de CEP pode exibir `00000-000`, mas a consulta envia somente dígitos.

### 8.2 ViaCEP

Endpoint:
`https://viacep.com.br/ws/{cep}/json/`

Contrato de resposta simplificado:

```ts
interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}
```

Comportamento:
- Validar 8 dígitos antes da chamada.
- Consultar quando o CEP estiver completo (ação explícita ou comportamento automático documentado).
- Indicar estado de carregamento.
- Preencher logradouro, bairro, cidade e UF somente quando os dados existirem.
- Não sobrescrever número nem complemento.
- Se `erro === true`, informar CEP não encontrado.
- Em falha de rede/HTTP/JSON, informar indisponibilidade e permitir nova tentativa/preenchimento manual conforme política aprovada.
- Evitar respostas fora de ordem: cancelar chamada anterior com `AbortController` ou ignorar resposta obsoleta.
- Não fazer requisições repetidas para o mesmo CEP sem necessidade.
- Testar sucesso, CEP inexistente, CEP malformado, falha de rede e resposta parcial.

O serviço deve ficar isolado em `services/cep/viaCep.ts`; componente não deve montar endpoint e interpretar resposta diretamente.

## 9. Cálculo e formatação monetária

- Todos os preços e taxas são inteiros em centavos.
- `subtotalInCents = items.reduce((sum, item) => sum + unitPriceInCents * quantity, 0)`.
- `totalInCents = subtotalInCents + deliveryFeeInCents`.
- Taxa inicial: `DELIVERY_FEE_IN_CENTS = 500`, em arquivo central de configuração/domínio.
- Formatar com `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`.
- Não usar `number` decimal em reais como fonte de verdade de cálculo.
- Verificar item inexistente no catálogo antes de calcular ou finalizar pedido.

## 10. Rotas e navegação

| Rota | Página | Regra |
|---|---|---|
| `/` | Home | Catálogo e adição de cafés |
| `/checkout` | Checkout | Carrinho, endereço e pagamento |
| `/success` | Success | Exibe snapshot válido do último pedido |

Regras:
- `BrowserRouter` no ponto de entrada ou composição equivalente.
- Não permitir submissão com carrinho vazio.
- Se usuário entrar no checkout sem itens, mostrar estado vazio e link para Home.
- Se Success não tiver snapshot válido, mostrar estado vazio; não inventar pedido.
- Após pedido válido, salvar snapshot e limpar carrinho em ordem segura.
- Atualizar a rota sem reload.

## 11. Tema e design system

Usar `ThemeProvider` do styled-components e um `ThemeContext`/hook para alternância.

Tokens mínimos:
- cores de marca;
- cores de superfície e fundo;
- texto primário/secundário;
- bordas;
- estados de sucesso/erro/aviso;
- sombras;
- raios;
- espaçamentos;
- tipografia;
- breakpoints.

Criar temas `light` e `dark` com os mesmos tokens semânticos. Não espalhar valores hexadecimais pelos componentes.

Referência visual:
- amarelo e roxo;
- Baloo 2 para títulos;
- Roboto para textos;
- personalização permitida desde que a identidade permaneça coerente e legível.

Breakpoints são decisões de implementação a validar com Figma; não inventar medidas exatas sem inspecionar o design. Definir breakpoints centralizados e testar pelo menos viewport móvel, tablet e desktop.

## 12. Componentes e responsabilidades

| Componente | Responsabilidade |
|---|---|
| `Header` | Marca, navegação, badge e controle de tema |
| `ThemeToggle` | Alternar tema com label acessível |
| `CoffeeCard` | Apresentar um café e controle de quantidade |
| `CoffeeCatalog` | Renderizar catálogo e categorias |
| `QuantityInput` | Controlar quantidade inteira positiva |
| `CartBadge` | Mostrar soma de unidades |
| `CartItem` | Mostrar e alterar um item |
| `CartSummary` | Subtotal, taxa e total |
| `DeliveryAddressForm` | Campos e consulta de CEP |
| `PaymentMethodSelector` | Escolher forma de pagamento |
| `OrderSuccess` | Exibir snapshot confirmado |
| `EmptyCart` | Estado vazio reutilizável |
| `PageLayout` | Estrutura compartilhada das páginas |

Componentes visuais não devem conter regras complexas de cálculo, persistência ou consulta externa.

## 13. Identidade e assets

- Guardar logo e variações em `src/assets/Log/` ou `public/`, conforme necessidade de importação.
- Favicon em `public/`.
- Não referenciar caminhos que não existam.
- Fornecer `alt` significativo para imagens informativas; usar `alt=""` para imagens puramente decorativas.
- Documentar ferramenta de IA, prompt, resultado e curadoria em README/Branding com IA.
- Verificar legibilidade em escala reduzida e licença/direitos de uso.

## 14. Estratégia de testes

### Unitários
- reducer: adicionar, acumular, incrementar, decrementar, remover, limpar, hidratar;
- cálculos: subtotal, taxa, total e carrinho vazio;
- formatação monetária;
- schema Zod: CEP, campos obrigatórios, complemento opcional, UF e pagamento;
- parser/validador de storage;
- transformação da resposta ViaCEP.

### Integração/UI
- card adiciona quantidade;
- badge soma unidades;
- carrinho altera/remover itens;
- refresh recupera carrinho;
- checkout bloqueia carrinho vazio;
- consulta CEP preenche campos;
- erros da API são apresentados;
- pagamento é obrigatório;
- pedido confirmado preserva snapshot e limpa carrinho;
- Success sem pedido apresenta estado vazio;
- tema persiste entre refreshes.

### Ferramentas
- Vitest;
- React Testing Library;
- `@testing-library/user-event`;
- `@testing-library/jest-dom`;
- MSW opcional para simular ViaCEP.

Playwright pode ser adotado para smoke/e2e se o ambiente e o prazo permitirem; não é dependência obrigatória inicial.

## 15. Qualidade e scripts

Scripts esperados no `package.json` (ajustar ao setup real):
- `dev`: iniciar Vite;
- `build`: validar e gerar build;
- `preview`: servir build local;
- `test`: executar testes;
- `test:watch`: modo watch;
- `lint`: análise estática;
- `typecheck`: `tsc --noEmit`.

Antes de definir scripts, verificar dependências instaladas e garantir que os comandos realmente existem.

## 16. Segurança e privacidade

- Tratar dados do localStorage como entrada não confiável.
- Não usar `dangerouslySetInnerHTML` para dados do catálogo/CEP.
- Não registrar endereço completo em logs.
- Não armazenar credenciais; projeto não deve precisar de secrets.
- Validar dados também na fronteira de serviços e persistência.
- Não prometer segurança de backend: aplicação é client-side e demonstrativa.

## 17. Matriz de rastreabilidade PRD → TECH

| PRD | Decisão técnica |
|---|---|
| RF-01 | `data/coffees.ts`, `Coffee`, `CoffeeCard`, `CoffeeCatalog` |
| RF-02 | `QuantityInput` com estado local e validação inteira positiva |
| RF-03 | `ADD_ITEM` no `cartReducer` acumula por `coffeeId` |
| RF-04 | `totalUnits` derivado do estado do carrinho |
| RF-05 | Ações reducer increment/decrement/remove |
| RF-06 | Persistência versionada e validada em localStorage |
| RF-07 | React Router e três rotas |
| RF-08 | React Hook Form + Zod + serviço ViaCEP |
| RF-09 | `PaymentMethod` discriminado e obrigatório no schema |
| RF-10 | Cálculos puros em centavos e `Intl.NumberFormat` |
| RF-11 | Guardas de carrinho, validação Zod e validação de IDs de catálogo |
| RF-12 | Página Success lê snapshot de pedido |
| RF-13 | Persistir snapshot antes de `CLEAR_CART` |
| RF-14 | ThemeProvider + storage de preferência |
| RF-15 | tokens/breakpoints + testes responsivos manuais/e2e |
| RF-16 | Assets locais, favicon e documentação de branding |

## 18. Decisões técnicas (resolvidas em T-003)

- styled-components aprovado (DP-04).
- Consulta ViaCEP **automática** quando o CEP atinge 8 dígitos, com botão "Buscar CEP" para nova tentativa; em falha, os campos permanecem editáveis para preenchimento manual.
- Imagens do catálogo: ilustrações PNG originais em `src/assets/img/` (DP-06).
- Figma não inspecionado (DP-07): breakpoints definidos em tokens (`sm 576px`, `md 768px`, `lg 1120px`) e validados manualmente.
- Taxa fixa de 500 centavos e remoção ao decrementar de 1 confirmadas (DP-02, DP-03).

## 19. Registro de revisão técnica (T-002)

Revisão realizada em 2026-11-17.

- [x] Stack confirmada: React 19 + Vite 7 + TypeScript 5.9 (strict), React Router, styled-components, React Hook Form + Zod, Vitest + React Testing Library.
- [x] Estrutura de diretórios da seção 4 adotada; o projeto vive em `` e a documentação em `que-isso-spec/`.
- [x] Tipos de domínio (seção 5) adotados como contrato.
- [x] Estado do carrinho: `CartState { items: CartItem[] }` com ações da seção 6.2.
- [x] Persistência versionada com as chaves da seção 7.
- [x] ViaCEP isolado em `services/cep/viaCep.ts`, com `AbortController`.
- [x] Matriz de rastreabilidade (seção 17) revisada; sem lacunas.
- [x] MSW não será instalado: os cenários do ViaCEP serão simulados com mock de `fetch` no Vitest (menos dependências, RNF-03).

## 20. Matriz final de aceite (T-048)

Status: ✅ atendido com evidência automatizada · ⚠️ atendido com ressalva · ⛔ pendente.

| Req. | Implementação | Evidência | Status |
|---|---|---|---|
| RF-01 | `data/coffees.ts`, `CoffeeCard`, `CoffeeCatalog` | `coffees.test.ts`, `CoffeeCard.test.tsx`, `CoffeeCatalog.test.tsx` | ✅ |
| RF-02 | `QuantityInput`, `utils/quantity.ts` | `QuantityInput.test.tsx`, `quantity.test.ts` | ✅ |
| RF-03 | `ADD_ITEM` acumula por `coffeeId` | `cartReducer.test.ts`, `Home.test.tsx` | ✅ |
| RF-04 | `getTotalUnits`, `CartBadge` | `CartBadge.test.tsx`, `cart.test.ts` | ✅ |
| RF-05 | `INCREMENT/DECREMENT/REMOVE_ITEM`, `CartItem` | `cartReducer.test.ts`, `CartItem.test.tsx`, `Checkout.test.tsx` | ✅ |
| RF-06 | `cartStorage.ts` + hidratação preguiçosa | `cartStorage.test.tsx`, `purchaseFlow.test.tsx` | ✅ |
| RF-07 | `AppRoutes` (React Router) | `AppRoutes.test.tsx` | ✅ |
| RF-08 | `DeliveryAddressForm`, `services/cep/viaCep.ts`, `checkoutSchema` | `viaCep.test.ts`, `DeliveryAddressForm.test.tsx` | ✅ |
| RF-09 | `PaymentMethodSelector` | `PaymentMethodSelector.test.tsx` | ✅ |
| RF-10 | `getCartTotals`, `CartSummary`, `formatCurrency` | `cart.test.ts`, `currency.test.ts`, `CartSummary.test.tsx` | ✅ |
| RF-11 | Zod + `validateCartForCheckout` | `CheckoutGuards.test.tsx` | ✅ |
| RF-12 | `OrderSuccess` a partir do snapshot | `Success.test.tsx`, `purchaseFlow.test.tsx` | ✅ |
| RF-13 | snapshot → salvar → limpar → navegar | `ConfirmOrder.test.tsx` | ✅ |
| RF-14 | `AppThemeProvider` + `useLocalStorage` | `ThemeToggle.test.tsx`, `purchaseFlow.test.tsx` | ✅ |
| RF-15 | tokens/breakpoints, layouts responsivos | Chrome headless 320–1280px sem overflow (T-041) | ✅ (verificação manual registrada) |
| RF-16 | logo SVG, favicon, README | `Header.test.tsx`, README "Branding com IA" | ⚠️ logo gerada pela IA, aprovação do estudante pendente |
| RN-01 | `isValidQuantity`, decremento de 1 remove | `cartReducer.test.ts`, `CartItem.test.tsx` | ✅ |
| RN-02 | acúmulo no reducer e no parser de storage | `cartReducer.test.ts`, `cartStorage.test.tsx` | ✅ |
| RN-03 | `DELIVERY_FEE_IN_CENTS = 500`; taxa só com itens | `cart.test.ts` | ✅ |
| RN-04 | centavos inteiros; `formatCurrency` rejeita decimais | `currency.test.ts` | ✅ |
| RN-05 | seleção informativa, sem requisição | `PaymentMethodSelector.test.tsx` | ✅ |
| RN-06 | snapshot congelado e independente | `order.test.ts` | ✅ |
| RN-07 | complemento opcional, CEP validado, falhas tratadas | `checkoutSchema.test.ts`, `viaCep.test.ts` | ✅ |
| RN-08 | catálogo local tipado | `coffees.test.ts` | ✅ |
| RN-09 | `EmptyCart` no checkout e no success | `Checkout.test.tsx`, `Success.test.tsx` | ✅ |
| RN-10 | guarda de carrinho e de IDs inexistentes | `CheckoutGuards.test.tsx` | ✅ |
| RNF-01 | labels, foco, teclado, contraste AA | `a11y.test.tsx`, `themes.test.ts`, axe no Chrome real (0 violações) | ✅ |
| RNF-02 | sem overflow 320–1280px | T-041 | ✅ |
| RNF-03 | sem libs de ícones; SVGs embutidos; cálculos memoizados | build ~147 kB gzip | ⚠️ sem code-splitting por rota |
| RNF-04 | ViaCEP indisponível, JSON inválido, snapshot antes de limpar | `viaCep.test.ts`, `cartStorage.test.tsx`, `ConfirmOrder.test.tsx` | ✅ |
| RNF-05 | testado em Chrome; Firefox/Safari não testados | — | ⚠️ |
| RNF-06 | TypeScript strict, lint, cobertura 96.6% | `npm run lint`, `typecheck`, `test:coverage` | ✅ |
| RNF-07 | só o CEP vai ao ViaCEP; nada é logado | README "Privacidade" | ✅ |

### Pendências explícitas

1. **Revisão humana:** DP-01 a DP-07 e as decisões listadas em `AI_USAGE.md` foram adotadas pela IA e precisam ser revisadas pelo estudante.
2. **Deploy (T-047):** configuração pronta; falta publicar com a conta do estudante e registrar a URL.
3. **Figma (DP-07):** não inspecionado; medidas seguem a descrição textual.
4. **Compatibilidade (RNF-05):** validar manualmente no Firefox e no Safari.

## 21. Divergências em relação à estrutura proposta (§4)

Divergências documentadas, todas mantendo as responsabilidades da seção 3:

- `src/config/constants.ts` centraliza taxa, limites de quantidade e chaves de storage.
- `src/routes/` (`AppRoutes`, `paths`) separa as rotas do `App`, o que permite testá-las com `MemoryRouter`.
- Parsers de persistência ficam perto do domínio: `contexts/CartContext/cartStorage.ts`, `contexts/ThemeContext/themeStorage.ts` e `utils/orderStorage.ts`; `utils/storage.ts` contém só o acesso seguro e genérico.
- Componentes adicionais: `Hero`, `FormField` (TextField acessível), `ProductImage` (fallback de imagem) e `icons` (SVG inline, sem dependência).
- Hook adicional: `useCepLookup` (estado de carregamento e cancelamento da consulta).
- Utils adicionais: `catalog.ts`, `postalCode.ts`, `order.ts`, `quantity.ts`.
- MSW não foi usado: os cenários do ViaCEP são simulados com mock de `fetch`.
- Dependências de teste adicionais: `axe-core` (acessibilidade) e `@vitest/coverage-v8` (cobertura).
