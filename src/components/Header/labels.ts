/** Nome acessível do link do carrinho, incluindo o total de unidades. */
export function cartLinkLabel(totalUnits: number): string {
  if (totalUnits === 0) return 'Carrinho vazio'
  return `Carrinho com ${totalUnits} ${totalUnits === 1 ? 'item' : 'itens'}`
}
