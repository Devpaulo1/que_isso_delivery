import { useId, useState, type ChangeEvent } from 'react'
import styled from 'styled-components'
import { MinusIcon, PlusIcon } from '@/components/icons'
import { MAX_QUANTITY, MIN_QUANTITY } from '@/config/constants'
import { parseQuantityInput } from '@/utils/quantity'

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[1]};
  padding: ${({ theme }) => theme.space[1]};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.button};
`

const StepButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.brandPurple};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.brandPurpleDark};
  }

  &:disabled {
    opacity: 0.4;
  }
`

const Field = styled.input`
  width: 2rem;
  height: 2rem;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: transparent;
  text-align: center;
  color: ${({ theme }) => theme.colors.title};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`

export interface QuantityInputProps {
  value: number
  /** Nome do produto, usado nos rótulos acessíveis. */
  label: string
  min?: number
  max?: number
  /** Chamado somente com quantidades válidas (inteiro positivo dentro dos limites). */
  onChange?: (quantity: number) => void
  /** Sobrescreve o comportamento do "+" (ex.: ação INCREMENT_ITEM do carrinho). */
  onIncrement?: () => void
  /** Sobrescreve o "−"; quando informado, o botão continua ativo no mínimo (RN-01). */
  onDecrement?: () => void
  readOnly?: boolean
}

export function QuantityInput({
  value,
  label,
  min = MIN_QUANTITY,
  max = MAX_QUANTITY,
  onChange,
  onIncrement,
  onDecrement,
  readOnly = false,
}: QuantityInputProps) {
  const inputId = useId()
  /** Texto em edição; `null` exibe o último valor válido. */
  const [draft, setDraft] = useState<string | null>(null)

  const increment = onIncrement ?? (() => onChange?.(Math.min(max, value + 1)))
  const decrement = onDecrement ?? (() => onChange?.(Math.max(min, value - 1)))

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const digits = event.target.value.replace(/\D/g, '').slice(0, String(max).length)
    setDraft(digits)
    const parsed = parseQuantityInput(digits, min, max)
    if (parsed !== null && parsed !== value) onChange?.(parsed)
  }

  return (
    <Wrapper role="group" aria-label={`Quantidade de ${label}`}>
      <StepButton
        type="button"
        onClick={() => {
          setDraft(null)
          decrement()
        }}
        disabled={!onDecrement && value <= min}
        aria-label={`Diminuir quantidade de ${label}`}
      >
        <MinusIcon size={16} />
      </StepButton>
      <label htmlFor={inputId} className="sr-only">
        Quantidade de {label}
      </label>
      <Field
        id={inputId}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        value={draft ?? String(value)}
        onChange={handleInputChange}
        onBlur={() => setDraft(null)}
        readOnly={readOnly}
      />
      <StepButton
        type="button"
        onClick={() => {
          setDraft(null)
          increment()
        }}
        disabled={value >= max}
        aria-label={`Aumentar quantidade de ${label}`}
      >
        <PlusIcon size={16} />
      </StepButton>
    </Wrapper>
  )
}
