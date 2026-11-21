/**
 * Constantes de domínio centralizadas.
 * Nada de taxa, chave de storage ou limite "mágico" espalhado pelo código.
 */

/** Taxa de entrega fixa e fictícia (DP-02): R$ 5,00. */
export const DELIVERY_FEE_IN_CENTS = 500

/** Limites aceitos pelo seletor de quantidade. */
export const MIN_QUANTITY = 1
export const MAX_QUANTITY = 99

/** Chaves do localStorage com namespace e versão (TECH_SPEC §7). */
export const STORAGE_KEYS = {
  cart: 'que-isso:cart:v1',
  theme: 'que-isso:theme:v1',
  lastOrder: 'que-isso:last-order:v1',
} as const
