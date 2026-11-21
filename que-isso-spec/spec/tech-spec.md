---
title: "QuE IssO — Technical Specification"
version: "1.0.0"
status: "Proposto para revisão"
---

# TechSpec — QuE IssO

## 1. Objetivo técnico

Definir uma arquitetura frontend simples, modular, testável e adequada ao escopo acadêmico do QuE IssO. A aplicação não possui backend. O catálogo é local, o estado do carrinho e tema é persistido no navegador e a única integração HTTP obrigatória é a consulta pública de CEP.

## 2. Stack recomendada

| Camada | Tecnologia | Responsabilidade |
|---|---|---|
| Linguagem | TypeScript (strict) | Tipagem de domínio e contratos |
| UI | React | Componentes e composição da interface |
| Build/dev server | Vite | Desenvolvimento e build |
| Rotas | React Router | Home, Checkout e Success |
| Estado global | Context API + `useReducer` | Carrinho e ações de domínio |
| Formulário | React Hook Form | Estado, submissão e integração de campos |
| Validação | Zod + resolver | Schema do endereço e pagamento |
| Estilo | CSS Modules + CSS Variables | Estilos isolados, tokens e temas |
| Testes unitários/componentes | Vitest + React Testing Library + user-event | Reducers, funções e componentes |
| Testes de navegador | Playwright (opcional/recomendado) | Fluxos ponta a ponta |
| Qualidade | ESLint + Prettier | Consistência e análise estática |
| CEP | ViaCEP | Busca de endereço por CEP |

> As versões exatas devem ser escolhidas no momento da instalação, compatíveis entre si e registradas no `package.json`/lockfile. Não atualizar versões principais sem necessidade do projeto.

## 3. Princípios arquiteturais

1. **Feature-oriented:** organizar funcionalidades por domínio, evitando uma pasta genérica com dezenas de componentes sem relação.
2. **Separação de responsabilidades:** UI não implementa regras monetárias, persistência ou detalhes de HTTP.
3. **Single source of truth:** estado do carrinho é mantido em um único provider.
4. **Imutabilidade:** reducers retornam novo estado e não alteram o anterior.
5. **Pure domain logic:** cálculo e normalização são funções puras.
6. **Ports/adapters leves:** serviços externos e armazenamento são isolados atrás de módulos próprios, sem introduzir framework de arquitetura.
7. **Testabilidade:** dependências externas são substituíveis por mocks.
8. **Progressive enhancement:** interface deve continuar clara em falhas de CEP ou armazenamento.

## 4. Arquitetura lógica

```text
┌──────────────────────────────────────────────────────────┐
│                        App Shell                         │
│  Router · Providers · Theme · Layout · Error Boundaries   │
└────────────────────────────┬─────────────────────────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
        Pages / Routes                 Shared UI
     Home / Checkout / Success     Header / Button / Input
              │                             │
              └──────────────┬──────────────┘
                             │
                    Feature Components
             Catalog · Cart · Checkout · Order
                             │
                  Application / State Layer
             CartContext · cartReducer · selectors
                             │
                       Domain Layer
          Money · Cart Rules · Order Snapshot · Address
                             │
                    Infrastructure Layer
        localStorage adapter · ViaCEP client · local catalog
```

### 4.1 Fluxo de dados

- A Home lê catálogo tipado e dispara `addItem`.
- `CartProvider` aplica `cartReducer` e expõe estado e dispatch encapsulados.
- Selectors calculam quantidade total, subtotal e itens derivados.
- Checkout lê o carrinho e utiliza formulário validado.
- Ao consultar CEP, o serviço ViaCEP retorna dados normalizados para preencher campos disponíveis.
- Ao confirmar, uma função de domínio cria snapshot imutável do pedido.
- O pedido é salvo separadamente; depois o carrinho é limpo e a aplicação navega para `/success`.
- ThemeProvider controla tema independente do carrinho.

## 5. Estrutura de diretórios proposta

```text
que-isso/
├── public/
│   ├── favicon.svg
│   └── images/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   └── providers/
│   │       ├── AppProviders.tsx
│   │       ├── CartProvider.tsx
│   │       └── ThemeProvider.tsx
│   ├── assets/
│   │   ├── brand/
│   │   │   ├── logo-light.svg
│   │   │   └── logo-dark.svg
│   │   ├── icons/
│   │   └── products/
│   ├── components/
│   │   ├── Header/
│   │   ├── QuantitySelector/
│   │   ├── Price/
│   │   ├── Button/
│   │   ├── FormField/
│   │   └── EmptyState/
│   ├── features/
│   │   ├── catalog/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── data/
│   │   │   └── types/
│   │   ├── cart/
│   │   │   ├── components/
│   │   │   ├── state/
│   │   │   ├── selectors/
│   │   │   └── utils/
│   │   ├── checkout/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── schemas/
│   │   │   ├── services/
│   │   │   └── types/
│   │   ├── orders/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   └── types/
│   │   └── theme/
│   │       ├── components/
│   │       └── hooks/
│   ├── hooks/
│   ├── lib/
│   │   ├── storage/
│   │   └── formatters/
│   ├── domain/
│   │   ├── money/
│   │   ├── cart/
│   │   ├── order/
│   │   └── address/
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── themes.css
│   │   ├── global.css
│   │   └── fonts.css
│   ├── test/
│   │   ├── setup.ts
│   │   └── factories/
│   └── main.tsx
├── spec/
│   ├── agents.md
│   ├── prd-spec.md
│   ├── tech-spec.md
│   └── task-spec.md
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
└── ...
```

A estrutura é uma referência inicial; durante a implementação, criar somente arquivos necessários e evitar pastas vazias.

## 6. Rotas e navegação

| Path | Página | Regra |
|---|---|---|
| `/` | HomePage | Exibe catálogo e permite adicionar produtos |
| `/checkout` | CheckoutPage | Exige carrinho com itens válidos para finalizar |
| `/success` | SuccessPage | Exibe último pedido válido; sem snapshot, apresenta estado vazio |
| `*` | NotFoundPage | Orienta retorno à Home |

### Proteções

- `CheckoutPage`: se carrinho vazio, exibir estado vazio e CTA para Home (pode redirecionar, desde que o feedback seja claro).
- `SuccessPage`: não depender do estado do carrinho; carregar snapshot salvo.
- Refresh em `/success`: deve manter a confirmação enquanto o snapshot estiver disponível.
- Não criar pedido automaticamente ao visitar `/success`.

## 7. Modelo de domínio

### 7.1 Product

```ts
export interface Product {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  image: string;
  tags: string[];
}
```

Regras: `id` único e estável; `priceCents` inteiro não negativo; `image` aponta para asset válido.

### 7.2 CartItem

```ts
export interface CartItem {
  productId: string;
  name: string;
  priceCents: number;
  image: string;
  quantity: number;
}
```

Snapshot dos dados essenciais do produto no carrinho evita que uma mudança futura no catálogo altere silenciosamente o valor de uma compra já iniciada. Na validação final, conferir se o `productId` ainda existe no catálogo local.

### 7.3 CartState

```ts
export interface CartState {
  items: CartItem[];
  version: 1;
}
```

### 7.4 Address

```ts
export interface DeliveryAddress {
  postalCode: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
}
```

### 7.5 Payment

```ts
export type PaymentMethod = 'credit' | 'debit' | 'cash';
```

### 7.6 OrderSnapshot

```ts
export interface OrderSnapshot {
  id: string;
  createdAt: string;
  items: CartItem[];
  address: DeliveryAddress;
  paymentMethod: PaymentMethod;
  subtotalCents: number;
  deliveryFeeCents: number;
  totalCents: number;
}
```

O snapshot deve ser criado com cópias dos dados necessários, sem referências mutáveis ao estado do carrinho.

## 8. Estado do carrinho

### 8.1 Ações

```ts
type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'INCREMENT_ITEM'; payload: { productId: string } }
  | { type: 'DECREMENT_ITEM'; payload: { productId: string } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE_CART'; payload: CartState };
```

### 8.2 Comportamento do reducer

- `ADD_ITEM`: validar quantidade inteira positiva; se produto já existe, somar quantidade; caso contrário, adicionar uma linha.
- `INCREMENT_ITEM`: incrementar item existente.
- `DECREMENT_ITEM`: decrementar; se quantidade resultante for zero, remover a linha.
- `REMOVE_ITEM`: remover apenas o produto informado.
- `CLEAR_CART`: retornar lista vazia.
- `HYDRATE_CART`: receber somente estado previamente validado pelo adaptador de persistência.

O reducer deve ser puro, determinístico e não acessar `localStorage`, rede, relógio ou APIs do navegador.

### 8.3 Selectors

```ts
selectCartUnits(items): number
selectCartSubtotalCents(items): number
selectCartItemCount(items): number
selectCartIsEmpty(items): boolean
```

- `selectCartUnits`: soma de quantidades.
- `selectCartSubtotalCents`: soma de `priceCents * quantity`.
- `selectCartItemCount`: quantidade de linhas distintas.
- `selectCartIsEmpty`: ausência de linhas.

## 9. Persistência local

### Chaves

```text
que-isso:cart
que-isso:theme
que-isso:last-order
```

### Estratégia

- Criar adaptador `storage` com operações `read`, `write` e `remove`.
- Persistir carrinho após mudanças relevantes.
- Usar envelope versionado (`version: 1`).
- Fazer parse dentro de `try/catch`.
- Validar estrutura, tipos, quantidades, IDs e preços antes de hidratar.
- Se inválido, remover/ignorar o conteúdo e iniciar estado seguro.
- Não misturar `last-order` com o carrinho.
- Se `localStorage` estiver indisponível, manter funcionamento em memória e comunicar limitação apenas se afetar a experiência.

## 10. Cálculos monetários

```ts
export const DELIVERY_FEE_CENTS = 500;

export function calculateSubtotalCents(items: CartItem[]): number {
  return items.reduce(
    (total, item) => total + item.priceCents * item.quantity,
    0,
  );
}

export function calculateTotalCents(
  subtotalCents: number,
  deliveryFeeCents: number,
): number {
  return subtotalCents + deliveryFeeCents;
}
```

Formatador:

```ts
const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatBRL(cents: number): string {
  return brlFormatter.format(cents / 100);
}
```

Não converter valores para `number` decimal para realizar operações aritméticas monetárias. A conversão para unidade monetária ocorre apenas na apresentação.

## 11. Integração ViaCEP

### Endpoint

`GET https://viacep.com.br/ws/{cep}/json/`

### Contrato externo esperado

```ts
interface ViaCepResponse {
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean;
}
```

### Serviço

Criar `lookupPostalCode(cep: string): Promise<AddressLookupResult>`.

Responsabilidades:
1. Normalizar CEP removendo caracteres não numéricos.
2. Validar exatamente 8 dígitos antes da requisição.
3. Fazer GET ao endpoint.
4. Tratar resposta HTTP não-ok, JSON inválido, `erro: true` e falha de rede.
5. Mapear `logradouro`, `bairro`, `localidade` e `uf` para campos do formulário.
6. Não sobrescrever número e complemento informados pelo usuário.
7. Tratar resposta incompleta sem preencher campos com valores falsos.
8. Prevenir corrida de requisições usando `AbortController` ou identificador da consulta mais recente.

### Estados de UI

- `idle`: aguardando CEP.
- `loading`: consultando.
- `success`: endereço localizado; campos disponíveis preenchidos.
- `not-found`: CEP não localizado.
- `invalid`: formato inválido.
- `error`: indisponibilidade/falha da API.

### UX

- Consultar ao completar 8 dígitos ou ao sair do campo, sem disparar requisições repetidas para o mesmo CEP.
- Mostrar feedback próximo ao campo CEP.
- Permitir correção manual de endereço após a consulta.
- Não bloquear a edição manual se a API estiver indisponível; o CEP continua obrigatório e válido em formato.

## 12. Formulário e validação

Schema conceitual:

- `postalCode`: obrigatório, 8 dígitos após normalização.
- `street`: obrigatório.
- `number`: obrigatório e não vazio.
- `complement`: opcional.
- `district`: obrigatório.
- `city`: obrigatório.
- `state`: obrigatório, UF com 2 letras.
- `paymentMethod`: enum obrigatório (`credit`, `debit`, `cash`).

A validação deve ocorrer no campo e novamente na submissão. Mensagens devem ser claras e associadas semanticamente ao input. Não permitir submit enquanto consulta de CEP estiver carregando ou quando o carrinho estiver vazio/inválido.

## 13. Finalização e snapshot do pedido

Sequência atômica no fluxo de aplicação:

1. Revalidar carrinho e catálogo.
2. Revalidar formulário.
3. Calcular subtotal, entrega e total em centavos.
4. Construir `OrderSnapshot` com `crypto.randomUUID()` (com fallback seguro caso o ambiente não ofereça suporte, sem colisão previsível).
5. Persistir `last-order`.
6. Limpar carrinho.
7. Navegar para `/success`.

Se a persistência do pedido falhar, não limpar o carrinho: informar erro e permitir nova tentativa. A tela Success deve ler somente o snapshot, nunca reconstruir o pedido a partir do carrinho.

## 14. Tema e design system

### Tokens

Definir CSS custom properties sem repetir cores diretamente nos componentes:

- `--color-brand-primary`
- `--color-brand-secondary`
- `--color-background`
- `--color-surface`
- `--color-text`
- `--color-text-muted`
- `--color-border`
- `--color-success`
- `--color-danger`
- `--radius-*`
- `--space-*`
- `--shadow-*`

Criar temas `[data-theme="light"]` e `[data-theme="dark"]` com contraste equivalente. Persistir preferência em `que-isso:theme`. Considerar `prefers-color-scheme` como valor inicial quando não houver preferência salva.

### Tipografia

Referência: Baloo 2 para títulos e Roboto para textos. Se houver personalização, registrar a decisão no README e garantir legibilidade. Preferir carregar fontes de forma eficiente e definir fallbacks.

### Responsividade

- Mobile-first.
- Cards de catálogo em grid fluido.
- Carrinho e resumo sem overflow horizontal.
- Formulário em uma coluna em telas estreitas e composição em colunas quando houver espaço.
- Alvos de toque confortáveis e controles acessíveis.
- Validar pelo menos 360 px, 768 px e 1280 px.

## 15. Componentes sugeridos

| Componente | Responsabilidade |
|---|---|
| `AppProviders` | Compor providers globais |
| `Header` | Logo, navegação, contador de unidades e controle de tema |
| `ProductCard` | Apresentar dados do café e ação de adicionar |
| `QuantitySelector` | Incrementar/decrementar quantidade com limites |
| `CartItemRow` | Exibir item e controles de quantidade/remoção |
| `CartSummary` | Subtotal, entrega e total |
| `AddressForm` | Campos do endereço e feedback da consulta CEP |
| `PaymentMethodSelector` | Selecionar crédito, débito ou dinheiro |
| `FormField` | Label, input, erro e hint acessíveis |
| `EmptyState` | Estado vazio reutilizável |
| `OrderSummary` | Exibir snapshot na confirmação |
| `ThemeToggle` | Alternar tema |

Não transformar cada elemento visual em componente independente sem ganho de reuso, teste ou clareza.

## 16. Estratégia de testes

### Unitários

- `cartReducer`: todas as ações, produto repetido, quantidade inválida, remoção ao decrementar de 1.
- Selectors: total de unidades, linhas, subtotal e carrinho vazio.
- Money: soma em centavos e formatação BRL.
- Order: snapshot independente e cálculos.
- Schemas: endereço válido/inválido e pagamento obrigatório.
- Storage: JSON inválido, versão incompatível e conteúdo malformado.

### Componentes

- ProductCard e QuantitySelector.
- Header com contador.
- Carrinho com atualização e remoção.
- Formulário com erros e estados de CEP.
- Tema claro/escuro.

### Integração

- Consulta ViaCEP com respostas válidas, `erro: true`, falha HTTP e rede indisponível.
- Consulta antiga não sobrescreve a mais recente.
- Checkout bloqueia carrinho vazio e formulário inválido.
- Confirmação persiste pedido e limpa carrinho.

### E2E recomendado

1. Abrir Home e adicionar produtos.
2. Navegar ao Checkout.
3. Atualizar quantidades.
4. Preencher CEP com API interceptada.
5. Informar número e pagamento.
6. Confirmar.
7. Verificar Success e carrinho limpo.
8. Atualizar a página e verificar snapshot.
9. Alternar tema e verificar persistência.

## 17. Observabilidade e tratamento de erros

Não é necessário integrar serviço externo de analytics. Utilizar estados explícitos e mensagens de UI. Erros técnicos devem ser tratados na fronteira correspondente e não expor stack traces ao usuário. Não registrar endereço completo em console.

## 18. Decisões arquiteturais (ADRs resumidos)

### ADR-001 — SPA sem backend
**Decisão:** React SPA, catálogo local e armazenamento do navegador.  
**Motivo:** escopo acadêmico não exige servidor e deve concentrar aprendizado em frontend.  
**Consequência:** dados são locais e não sincronizam entre dispositivos.

### ADR-002 — Context API + useReducer para carrinho
**Decisão:** provider único e reducer puro.  
**Motivo:** requisito explícito e domínio de estado compartilhado moderado.  
**Consequência:** não introduzir Redux/Zustand sem necessidade comprovada.

### ADR-003 — Dinheiro em centavos
**Decisão:** inteiros para todos os cálculos.  
**Motivo:** evitar imprecisão de ponto flutuante.  
**Consequência:** formatação fica isolada na camada de apresentação.

### ADR-004 — ViaCEP como integração obrigatória
**Decisão:** serviço dedicado e contrato normalizado.  
**Motivo:** atender RN-07/RF-08 e isolar API externa.  
**Consequência:** a experiência deve tratar indisponibilidade e permitir correção manual.

### ADR-005 — Snapshot separado do carrinho
**Decisão:** persistir pedido concluído em chave independente.  
**Motivo:** limpar carrinho sem perder confirmação.  
**Consequência:** estado Success não depende do provider do carrinho.

### ADR-006 — CSS Variables + CSS Modules
**Decisão:** tokens globais e estilos isolados por componente/feature.  
**Motivo:** temas coerentes, baixo acoplamento e simplicidade para projeto educacional.  
**Consequência:** tokens devem ser a única fonte de cores e escalas compartilhadas.

## 19. Critérios de validação técnica

- `tsc --noEmit` sem erros.
- ESLint sem erros.
- Vitest passando.
- Build Vite concluído.
- Fluxo crítico manual/E2E concluído.
- Sem chaves ou credenciais secretas no repositório.
- Sem dependência de backend ou pagamento real.
- Todos os RFs rastreáveis a pelo menos um teste ou checklist de verificação.
