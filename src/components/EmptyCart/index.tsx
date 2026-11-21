import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { CoffeeIcon } from '@/components/icons'
import { ROUTES } from '@/routes/paths'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[10]} ${({ theme }) => theme.space[4]};
  text-align: center;

  svg {
    color: ${({ theme }) => theme.colors.brandYellowDark};
  }

  p {
    max-width: 28rem;
    color: ${({ theme }) => theme.colors.text};
  }
`

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.subtitle};
`

const Action = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding: 0 ${({ theme }) => theme.space[6]};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.brandYellow};
  color: ${({ theme }) => theme.colors.onYellow};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-decoration: none;
  text-transform: uppercase;
  transition: filter ${({ theme }) => theme.transitions.fast};

  &:hover {
    filter: brightness(0.95);
  }
`

export interface EmptyCartProps {
  title?: string
  description?: string
  actionLabel?: string
  to?: string
  /** Nível do título, para manter a hierarquia correta em cada página. */
  headingLevel?: 'h1' | 'h2'
}

export function EmptyCart({
  title = 'Seu carrinho está vazio',
  description = 'Escolha seus cafés favoritos no catálogo para montar o pedido.',
  actionLabel = 'Ver cafés',
  to = ROUTES.home,
  headingLevel = 'h2',
}: EmptyCartProps) {
  return (
    <Wrapper role="status">
      <CoffeeIcon size={48} />
      <Title as={headingLevel}>{title}</Title>
      <p>{description}</p>
      <Action to={to}>{actionLabel}</Action>
    </Wrapper>
  )
}
