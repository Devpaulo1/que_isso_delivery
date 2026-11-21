import type { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { BankIcon, CreditCardIcon, DollarIcon, MoneyIcon } from '@/components/icons'
import type { CheckoutFormInput } from '@/schemas/checkoutSchema'
import { PAYMENT_METHOD_LABELS, PAYMENT_METHODS, type PaymentMethod } from '@/types/checkout'

const ICONS: Record<PaymentMethod, ReactNode> = {
  credit: <CreditCardIcon size={18} />,
  debit: <BankIcon size={18} />,
  cash: <MoneyIcon size={18} />,
}

const Card = styled.fieldset`
  min-width: 0;
  padding: ${({ theme }) => theme.space[6]};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};

  ${({ theme }) => theme.media.md} {
    padding: ${({ theme }) => theme.space[10]};
  }
`

const Legend = styled.legend`
  float: left;
  width: 100%;
  display: flex;
  gap: ${({ theme }) => theme.space[2]};

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.brandPurple};
  }

  strong {
    display: block;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.subtitle};
  }

  span {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`

const Options = styled.div`
  clear: both;
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  padding-top: ${({ theme }) => theme.space[8]};

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const Option = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  min-height: 3.25rem;
  padding: 0 ${({ theme }) => theme.space[4]};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  svg {
    color: ${({ theme }) => theme.colors.brandPurple};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.buttonHover};
  }

  /* Rádio nativo invisível, mas focável e clicável via label. */
  input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }

  &:has(input:focus-visible) {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  /* Selecionado: borda + fundo + marcação textual (não depende só da cor). */
  &:has(input:checked) {
    border-color: ${({ theme }) => theme.colors.brandPurple};
    background: ${({ theme }) => theme.colors.brandPurpleLight};
    font-weight: ${({ theme }) => theme.fontWeights.bold};

    &::after {
      content: '✓';
      margin-left: auto;
      color: ${({ theme }) => theme.colors.brandPurpleDark};
    }
  }
`

const ErrorMessage = styled.p`
  margin-top: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.error};

  &::before {
    content: '⚠ ';
  }
`

const Note = styled.p`
  margin-top: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.label};
`

const ERROR_ID = 'payment-method-error'

/**
 * Seleção informativa (RN-05): nenhuma transação é iniciada.
 * Usa rádios nativos para navegação por setas e leitura correta em leitores de tela.
 */
export function PaymentMethodSelector() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormInput>()
  const error = errors.paymentMethod?.message

  return (
    <Card aria-describedby={error ? ERROR_ID : undefined} aria-invalid={error ? true : undefined}>
      <Legend>
        <DollarIcon size={22} />
        <span>
          <strong>Pagamento</strong>
          O pagamento é feito na entrega. Escolha a forma que deseja pagar
        </span>
      </Legend>

      <Options>
        {PAYMENT_METHODS.map((method) => (
          <Option key={method}>
            <input type="radio" value={method} {...register('paymentMethod')} />
            {ICONS[method]}
            {PAYMENT_METHOD_LABELS[method]}
          </Option>
        ))}
      </Options>

      {error ? (
        <ErrorMessage id={ERROR_ID} role="alert">
          {error}
        </ErrorMessage>
      ) : null}
      <Note>Pedido fictício: nenhuma cobrança será realizada.</Note>
    </Card>
  )
}
