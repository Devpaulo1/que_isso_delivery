const brlCurrency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

const brlDecimal = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function assertCents(cents: number): void {
  if (!Number.isInteger(cents)) {
    throw new TypeError(`Valor monetário deve ser inteiro em centavos: ${cents}`)
  }
}

/** 1290 → "R$ 12,90" (RN-04: centavos inteiros como fonte de verdade). */
export function formatCurrency(cents: number): string {
  assertCents(cents)
  return brlCurrency.format(cents / 100)
}

/** 1290 → "12,90" (sem símbolo, para layouts com "R$" separado). */
export function formatAmount(cents: number): string {
  assertCents(cents)
  return brlDecimal.format(cents / 100)
}
