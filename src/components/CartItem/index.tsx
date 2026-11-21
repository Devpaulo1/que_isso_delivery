import { useTranslation } from 'react-i18next'
import { coffeeName } from '@/i18n'
import styled from 'styled-components'
import { TrashIcon } from '@/components/icons'
import { ProductImage } from '@/components/ProductImage'
import { QuantityInput } from '@/components/QuantityInput'
import type { ResolvedCartItem } from '@/types/cart'
import { formatCurrency } from '@/utils/currency'

const Row = styled.li`
  display: grid;
  grid-template-columns: 4rem 1fr auto;
  gap: ${({ theme }) => theme.space[4]};
  align-items: start;
  padding-bottom: ${({ theme }) => theme.space[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.button};

  img {
    width: 4rem;
    height: 4rem;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
  min-width: 0;

  h3 {
    font-family: ${({ theme }) => theme.fonts.text};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.subtitle};
  }
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
`

const RemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[1]};
  min-height: 2.5rem;
  padding: 0 ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  svg {
    color: ${({ theme }) => theme.colors.brandPurple};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.buttonHover};
  }
`

const LineTotal = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
`

export interface CartItemProps {
  item: ResolvedCartItem
  onIncrement: (coffeeId: string) => void
  onDecrement: (coffeeId: string) => void
  onRemove: (coffeeId: string) => void
}

export function CartItem({ item, onIncrement, onDecrement, onRemove }: CartItemProps) {
  const { coffee, quantity, lineTotalInCents } = item
  const { t } = useTranslation()
  const name = coffeeName(t, coffee)

  return (
    <Row aria-label={t('cartItem.row', { name, count: quantity })}>
      <ProductImage src={coffee.image} size={64} />
      <Info>
        <h3>{name}</h3>
        <Actions>
          <QuantityInput
            label={name}
            value={quantity}
            readOnly
            onIncrement={() => onIncrement(coffee.id)}
            onDecrement={() => onDecrement(coffee.id)}
          />
          <RemoveButton type="button" onClick={() => onRemove(coffee.id)} aria-label={t('cartItem.removeLabel', { name })}>
            <TrashIcon size={16} />
            {t('cartItem.remove')}
          </RemoveButton>
        </Actions>
      </Info>
      <LineTotal>{formatCurrency(lineTotalInCents)}</LineTotal>
    </Row>
  )
}
