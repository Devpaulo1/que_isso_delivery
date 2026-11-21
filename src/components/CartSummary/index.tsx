import type { ReactNode } from 'react'
import styled from 'styled-components'
import { formatCurrency } from '@/utils/currency'

const List = styled.dl`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};

  div {
    display: flex;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space[4]};
  }

  dt {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  dd {
    color: ${({ theme }) => theme.colors.text};
  }

  .total {
    dt,
    dd {
      font-size: ${({ theme }) => theme.fontSizes.xl};
      font-weight: ${({ theme }) => theme.fontWeights.bold};
      color: ${({ theme }) => theme.colors.subtitle};
    }
  }
`

const Footer = styled.div`
  margin-top: ${({ theme }) => theme.space[6]};
`

export interface CartSummaryProps {
  subtotalInCents: number
  deliveryFeeInCents: number
  totalInCents: number
  /** Ação exibida abaixo dos valores (ex.: botão de confirmar). */
  children?: ReactNode
}

export function CartSummary({
  subtotalInCents,
  deliveryFeeInCents,
  totalInCents,
  children,
}: CartSummaryProps) {
  return (
    <section aria-label="Resumo de valores">
      <List>
        <div>
          <dt>Total de itens</dt>
          <dd>{formatCurrency(subtotalInCents)}</dd>
        </div>
        <div>
          <dt>Entrega</dt>
          <dd>{formatCurrency(deliveryFeeInCents)}</dd>
        </div>
        <div className="total">
          <dt>Total</dt>
          <dd>{formatCurrency(totalInCents)}</dd>
        </div>
      </List>
      {children ? <Footer>{children}</Footer> : null}
    </section>
  )
}
