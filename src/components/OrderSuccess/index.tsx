import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled, { type DefaultTheme } from 'styled-components'
import { CartSummary } from '@/components/CartSummary'
import { DollarIcon, MapPinIcon, TimerIcon } from '@/components/icons'
import { ROUTES } from '@/routes/paths'
import { PAYMENT_METHOD_LABELS } from '@/types/checkout'
import type { Order } from '@/types/order'
import { formatCurrency } from '@/utils/currency'
import { formatPostalCode } from '@/utils/postalCode'

const Wrapper = styled.section`
  margin-top: ${({ theme }) => theme.space[10]};

  ${({ theme }) => theme.media.md} {
    margin-top: ${({ theme }) => theme.space[20]};
  }
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.extraBold};
  color: ${({ theme }) => theme.colors.brandYellowDark};
`

const Subtitle = styled.p`
  margin-top: ${({ theme }) => theme.space[1]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.subtitle};
`

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[8]};
  margin-top: ${({ theme }) => theme.space[10]};

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
  }
`

/** Borda em gradiente amarelo → roxo, como destaque da confirmação. */
const InfoBox = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space[8]};
  padding: ${({ theme }) => theme.space[10]} ${({ theme }) => theme.space[6]};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.card};
  background:
    linear-gradient(${({ theme }) => theme.colors.background}, ${({ theme }) => theme.colors.background}) padding-box,
    linear-gradient(102deg, ${({ theme }) => theme.colors.brandYellow}, ${({ theme }) => theme.colors.brandPurple}) border-box;
  list-style: none;

  ${({ theme }) => theme.media.md} {
    padding: ${({ theme }) => theme.space[10]};
  }

  li {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space[3]};
  }
`

type Tone = 'purple' | 'yellow' | 'yellowDark'

const toneColor: Record<Tone, (theme: DefaultTheme) => { bg: string; fg: string }> = {
  purple: (t) => ({ bg: t.colors.brandPurpleDark, fg: t.colors.onBrand }),
  yellow: (t) => ({ bg: t.colors.brandYellow, fg: t.colors.onYellow }),
  yellowDark: (t) => ({ bg: t.colors.brandYellowDark, fg: t.colors.onYellow }),
}

const IconBadge = styled.span<{ $tone: Tone }>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $tone }) => toneColor[$tone](theme).bg};
  color: ${({ theme, $tone }) => toneColor[$tone](theme).fg};
`

const Summary = styled.section`
  padding: ${({ theme }) => theme.space[6]};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};

  ${({ theme }) => theme.media.md} {
    padding: ${({ theme }) => theme.space[10]};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.subtitle};
  }
`

const ItemList = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  margin: ${({ theme }) => theme.space[4]} 0 ${({ theme }) => theme.space[6]};
  padding-bottom: ${({ theme }) => theme.space[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.button};
  list-style: none;

  li {
    display: grid;
    grid-template-columns: 2.5rem 1fr auto;
    gap: ${({ theme }) => theme.space[3]};
    align-items: center;
  }

  img {
    width: 2.5rem;
    height: 2.5rem;
  }

  strong {
    white-space: nowrap;
  }
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  margin-top: ${({ theme }) => theme.space[8]};
  padding: 0 ${({ theme }) => theme.space[6]};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.brandPurpleDark};
  color: ${({ theme }) => theme.colors.onBrand};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-decoration: none;
`

const OrderMeta = styled.p`
  margin-top: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.label};
`

function InfoItem({ tone, icon, children }: { tone: Tone; icon: ReactNode; children: ReactNode }) {
  return (
    <li>
      <IconBadge $tone={tone}>{icon}</IconBadge>
      <p>{children}</p>
    </li>
  )
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' })

export interface OrderSuccessProps {
  order: Order
}

/** Exibe exclusivamente dados do snapshot: não consulta carrinho nem catálogo. */
export function OrderSuccess({ order }: OrderSuccessProps) {
  const { address } = order

  return (
    <Wrapper aria-labelledby="success-title">
      <Title id="success-title">Uhu! Pedido confirmado</Title>
      <Subtitle>Agora é só aguardar que logo o café chegará até você</Subtitle>

      <Grid>
        <div>
          <InfoBox aria-label="Detalhes da entrega">
            <InfoItem tone="purple" icon={<MapPinIcon size={16} />}>
              Entrega em{' '}
              <strong>
                {address.street}, {address.number}
              </strong>
              {address.complement ? ` — ${address.complement}` : null}
              <br />
              {address.neighborhood} - {address.city}, {address.state} · CEP {formatPostalCode(address.postalCode)}
            </InfoItem>
            <InfoItem tone="yellow" icon={<TimerIcon size={16} />}>
              Previsão de entrega
              <br />
              <strong>20 min - 30 min</strong>
            </InfoItem>
            <InfoItem tone="yellowDark" icon={<DollarIcon size={16} />}>
              Pagamento na entrega
              <br />
              <strong>{PAYMENT_METHOD_LABELS[order.paymentMethod]}</strong>
            </InfoItem>
          </InfoBox>
          <OrderMeta>
            Pedido nº {order.id.slice(0, 8).toUpperCase()} · {dateFormatter.format(new Date(order.createdAt))}
          </OrderMeta>
        </div>

        <Summary aria-labelledby="order-summary-title">
          <h2 id="order-summary-title">Resumo do pedido</h2>
          <ItemList aria-label="Itens do pedido confirmado">
            {order.items.map((item) => (
              <li key={item.coffeeId}>
                <img src={item.image} alt="" width={40} height={40} />
                <span>
                  {item.quantity} × {item.name}
                </span>
                <strong>{formatCurrency(item.lineTotalInCents)}</strong>
              </li>
            ))}
          </ItemList>
          <CartSummary
            subtotalInCents={order.subtotalInCents}
            deliveryFeeInCents={order.deliveryFeeInCents}
            totalInCents={order.totalInCents}
          />
        </Summary>
      </Grid>

      <BackLink to={ROUTES.home}>Voltar para a Home</BackLink>
    </Wrapper>
  )
}
