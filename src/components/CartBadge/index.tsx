import styled from 'styled-components'

const Badge = styled.span`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 ${({ theme }) => theme.space[1]};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.brandYellowDark};
  color: ${({ theme }) => theme.colors.onYellow};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1;
`

interface CartBadgeProps {
  /** Soma das quantidades de todos os itens (RF-04). */
  count: number
}

/** Visual apenas: o nome acessível fica no link do carrinho. */
export function CartBadge({ count }: CartBadgeProps) {
  if (count <= 0) return null
  return (
    <Badge aria-hidden="true" data-testid="cart-badge">
      {count > 99 ? '99+' : count}
    </Badge>
  )
}
