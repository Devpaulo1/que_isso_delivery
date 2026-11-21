import { useId, type InputHTMLAttributes, type Ref } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
  min-width: 0;
`

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.subtitle};

  span {
    font-style: italic;
    color: ${({ theme }) => theme.colors.label};
  }
`

const Input = styled.input`
  width: 100%;
  min-height: 2.75rem;
  padding: 0 ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme }) => theme.colors.button};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.label};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brandYellowDark};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.brandYellowDark};
  }

  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.error};
    border-width: 2px;
  }
`

const Hint = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.label};
`

const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.error};

  &::before {
    content: '⚠ ';
  }
`

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string
  error?: string
  hint?: string
  optional?: boolean
  ref?: Ref<HTMLInputElement>
  className?: string
}

/**
 * Campo com label visível, mensagem de erro associada via aria-describedby
 * e estado inválido que não depende só da cor (ícone + texto).
 */
export function TextField({ label, error, hint, optional, className, ref, ...inputProps }: TextFieldProps) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <Wrapper className={className}>
      <Label htmlFor={id}>
        {label}
        {optional ? <span>Opcional</span> : null}
      </Label>
      <Input
        id={id}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...inputProps}
      />
      {hint ? <Hint id={hintId}>{hint}</Hint> : null}
      {error ? <ErrorMessage id={errorId}>{error}</ErrorMessage> : null}
    </Wrapper>
  )
}
