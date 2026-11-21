export const pt = {
  language: {
    label: 'Idioma',
  },
  layout: {
    skipLink: 'Pular para o conteúdo',
  },
  header: {
    home: ' — página inicial',
    actions: 'Ações',
    cartEmpty: 'Carrinho vazio',
    cartWithItems_one: 'Carrinho com {{count}} item',
    cartWithItems_other: 'Carrinho com {{count}} itens',
    location: 'Entrega em {{city}}, {{state}}',
  },
  theme: {
    toLight: 'Ativar tema claro',
    toDark: 'Ativar tema escuro',
  },
  hero: {
    title: 'Encontre o café perfeito para qualquer hora do dia',
    subtitle: 'Com o QuE IssO você recebe seu café onde estiver, a qualquer hora',
    simplePurchase: 'Compra simples e segura',
    packaging: 'Embalagem mantém o café intacto',
    fastDelivery: 'Entrega rápida e rastreada',
    freshCoffee: 'O café chega fresquinho até você',
  },
  catalog: {
    title: 'Nossos cafés',
    filter: 'Filtrar por categoria',
    list: 'Lista de cafés',
  },
  categories: {
    traditional: 'Tradicional',
    special: 'Especial',
    'with-milk': 'Com leite',
    alcoholic: 'Alcoólico',
    iced: 'Gelado',
  },
  card: {
    categories: 'Categorias',
    imageAlt: 'Xícara de {{name}}',
    add: 'Adicionar {{name}} ao carrinho',
    added: '{{quantity}} × {{name}} adicionado ao carrinho',
  },
  quantity: {
    group: 'Quantidade de {{name}}',
    decrease: 'Diminuir quantidade de {{name}}',
    increase: 'Aumentar quantidade de {{name}}',
  },
  cartItem: {
    row_one: '{{name}}, {{count}} unidade',
    row_other: '{{name}}, {{count}} unidades',
    remove: 'Remover',
    removeLabel: 'Remover {{name}} do carrinho',
  },
  summary: {
    label: 'Resumo de valores',
    items: 'Total de itens',
    delivery: 'Entrega',
    total: 'Total',
  },
  emptyCart: {
    title: 'Seu carrinho está vazio',
    description: 'Escolha seus cafés favoritos no catálogo para montar o pedido.',
    action: 'Ver cafés',
  },
  form: {
    optional: 'Opcional',
  },
  address: {
    title: 'Endereço de entrega',
    subtitle: 'Informe o endereço onde deseja receber seu pedido',
    postalCode: 'CEP',
    postalCodeHint: 'O endereço é preenchido automaticamente',
    search: 'Buscar CEP',
    searching: 'Buscando…',
    street: 'Rua',
    number: 'Número',
    complement: 'Complemento',
    neighborhood: 'Bairro',
    city: 'Cidade',
    state: 'UF',
    status: {
      loading: 'Buscando endereço…',
      success: '✓ Endereço encontrado. Confira e informe o número.',
      invalid: '⚠ CEP inválido. Verifique os 8 dígitos.',
      notFound: '⚠ CEP não encontrado. Preencha o endereço manualmente.',
      error: '⚠ Não foi possível consultar o CEP agora. Tente novamente ou preencha manualmente.',
    },
  },
  validation: {
    postalCodeRequired: 'Informe o CEP',
    postalCodeDigits: 'CEP deve ter 8 dígitos',
    streetRequired: 'Informe a rua',
    numberRequired: 'Informe o número',
    neighborhoodRequired: 'Informe o bairro',
    cityRequired: 'Informe a cidade',
    stateRequired: 'Informe a UF',
    stateInvalid: 'UF inválida',
    paymentRequired: 'Selecione uma forma de pagamento',
    maxLength: 'Use no máximo {{max}} caracteres',
  },
  payment: {
    title: 'Pagamento',
    subtitle: 'O pagamento é feito na entrega. Escolha a forma que deseja pagar',
    note: 'Pedido fictício: nenhuma cobrança será realizada.',
    credit: 'Cartão de crédito',
    debit: 'Cartão de débito',
    cash: 'Dinheiro',
  },
  checkout: {
    pageTitle: 'Finalizar pedido',
    completeOrder: 'Complete seu pedido',
    selectedCoffees: 'Cafés selecionados',
    orderItems: 'Itens do pedido',
    confirm: 'Confirmar pedido',
    unavailable_one: 'Um item do carrinho não está mais disponível no catálogo.',
    unavailable_other: '{{count}} itens do carrinho não estão mais disponíveis no catálogo.',
    removeUnavailable: 'Remover itens indisponíveis',
    errorEmpty: 'Adicione pelo menos um café antes de confirmar o pedido.',
    errorUnavailable: 'Há itens indisponíveis no carrinho. Remova-os para continuar.',
    errorSave: 'Não foi possível salvar o pedido neste navegador. Tente novamente.',
  },
  success: {
    title: 'Uhu! Pedido confirmado',
    subtitle: 'Agora é só aguardar que logo o café chegará até você',
    deliveryDetails: 'Detalhes da entrega',
    deliveryTo: 'Entrega em',
    postalCode: 'CEP',
    estimate: 'Previsão de entrega',
    paymentOnDelivery: 'Pagamento na entrega',
    orderNumber: 'Pedido nº',
    summary: 'Resumo do pedido',
    confirmedItems: 'Itens do pedido confirmado',
    backHome: 'Voltar para a Home',
    noOrderTitle: 'Nenhum pedido confirmado',
    noOrderDescription:
      'Não encontramos um pedido concluído neste navegador. Escolha seus cafés e finalize um pedido para ver a confirmação.',
  },
}

type Translation<T> = { [K in keyof T]: T[K] extends string ? string : Translation<T[K]> }
/**
 * Formato que en/es precisam seguir: mesmas chaves do português, mais os cafés por id.
 * Em português, nome e descrição vêm do próprio catálogo (src/data/coffees.ts).
 */
export type Messages = Translation<typeof pt> & {
  coffees: Record<string, { name: string; description: string }>
}
