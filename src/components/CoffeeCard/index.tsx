import { useState } from 'react'
import styled from 'styled-components'
import { CartIcon } from '@/components/icons'
import { QuantityInput } from '@/components/QuantityInput'
import { MIN_QUANTITY } from '@/config/constants'
import type { Coffee } from '@/types/coffee'
import { formatAmount } from '@/utils/currency'
import { isValidQuantity } from '@/utils/quantity'

const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 ${({ theme }) => theme.space[5]} ${({ theme }) => theme.space[5]};
  margin-top: ${({ theme }) => theme.space[5]};
  border-radius: ${({ theme }) => theme.radii.card};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
`

const Image = styled.img`
  width: 7.5rem;
  height: 7.5rem;
  margin-top: -${({ theme }) => theme.space[5]};
`

const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.space[1]};
  margin-top: ${({ theme }) => theme.space[3]};
  list-style: none;

  li {
    padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[2]};
    border-radius: ${({ theme }) => theme.radii.pill};
    background: ${({ theme }) => theme.colors.brandYellowLight};
    color: ${({ theme }) => theme.colors.tagText};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    text-transform: uppercase;
  }
`

const Name = styled.h3`
  margin-top: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.subtitle};
`

const Description = styled.p`
  margin-top: ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.label};
  flex: 1;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[2]};
  width: 100%;
  margin-top: ${({ theme }) => theme.space[6]};
`

const Price = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  white-space: nowrap;

  strong {
    margin-left: ${({ theme }) => theme.space[1]};
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.extraBold};
  }
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`

const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.brandPurpleDark};
  color: ${({ theme }) => theme.colors.onBrand};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.brandPurple};
  }
`

const Feedback = styled.p`
  min-height: 1.25rem;
  margin-top: ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.success};
`

export interface CoffeeCardProps {
  coffee: Coffee
  onAddToCart?: (coffeeId: Coffee['id'], quantity: number) => void
}

export function CoffeeCard({ coffee, onAddToCart }: CoffeeCardProps) {
  const [quantity, setQuantity] = useState(MIN_QUANTITY)
  const [feedback, setFeedback] = useState('')
  const titleId = `coffee-${coffee.id}-title`

  function handleAdd() {
    if (!isValidQuantity(quantity)) return
    onAddToCart?.(coffee.id, quantity)
    setFeedback(`${quantity} × ${coffee.name} adicionado ao carrinho`)
    setQuantity(MIN_QUANTITY)
  }

  return (
    <Card aria-labelledby={titleId}>
      <Image src={coffee.image} alt={`Xícara de ${coffee.name}`} width={120} height={120} loading="lazy" />
      <Tags aria-label="Categorias">
        {coffee.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </Tags>
      <Name id={titleId}>{coffee.name}</Name>
      <Description>{coffee.description}</Description>

      <Footer>
        <Price>
          R$<strong>{formatAmount(coffee.priceInCents)}</strong>
        </Price>
        <Controls>
          <QuantityInput label={coffee.name} value={quantity} onChange={setQuantity} />
          <AddButton
            type="button"
            onClick={handleAdd}
            aria-label={`Adicionar ${coffee.name} ao carrinho`}
            disabled={!isValidQuantity(quantity)}
          >
            <CartIcon size={20} />
          </AddButton>
        </Controls>
      </Footer>
      <Feedback role="status" aria-live="polite">
        {feedback}
      </Feedback>
    </Card>
  )
}
