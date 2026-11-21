import { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { TextField } from '@/components/FormField'
import { MapPinIcon } from '@/components/icons'
import { useCepLookup, type CepLookupState } from '@/hooks/useCepLookup'
import type { CheckoutFormInput } from '@/schemas/checkoutSchema'
import type { CepAddress } from '@/services/cep/viaCep'
import { formatPostalCode, isCompletePostalCode, normalizePostalCode } from '@/utils/postalCode'

const Card = styled.section`
  padding: ${({ theme }) => theme.space[6]};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};

  ${({ theme }) => theme.media.md} {
    padding: ${({ theme }) => theme.space[10]};
  }
`

const Heading = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[2]};

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.brandYellowDark};
  }

  h3 {
    font-family: ${({ theme }) => theme.fonts.text};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.subtitle};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[4]};
  margin-top: ${({ theme }) => theme.space[8]};

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(6, minmax(0, 1fr));

    .cep { grid-column: span 3; }
    .cep-action { grid-column: span 3; align-self: end; }
    .street { grid-column: 1 / -1; }
    .number { grid-column: span 2; }
    .complement { grid-column: span 4; }
    .neighborhood { grid-column: span 2; }
    .city { grid-column: span 3; }
    .state { grid-column: span 1; }
  }
`

const LookupButton = styled.button`
  min-height: 2.75rem;
  padding: 0 ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.buttonHover};
  }

  &:disabled {
    opacity: 0.6;
  }
`

const Status = styled.p<{ $tone: 'neutral' | 'success' | 'error' }>`
  grid-column: 1 / -1;
  min-height: 1.25rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme, $tone }) =>
    $tone === 'error' ? theme.colors.error : $tone === 'success' ? theme.colors.success : theme.colors.text};
`

const STATUS_MESSAGES: Record<CepLookupState['status'], { text: string; tone: 'neutral' | 'success' | 'error' }> = {
  idle: { text: '', tone: 'neutral' },
  loading: { text: 'Buscando endereço…', tone: 'neutral' },
  success: { text: '✓ Endereço encontrado. Confira e informe o número.', tone: 'success' },
  invalid: { text: '⚠ CEP inválido. Verifique os 8 dígitos.', tone: 'error' },
  'not-found': { text: '⚠ CEP não encontrado. Preencha o endereço manualmente.', tone: 'error' },
  error: {
    text: '⚠ Não foi possível consultar o CEP agora. Tente novamente ou preencha manualmente.',
    tone: 'error',
  },
}

/** Campos preenchidos pela API. Número e complemento nunca são sobrescritos. */
const AUTOFILL_FIELDS = ['street', 'neighborhood', 'city', 'state'] as const satisfies ReadonlyArray<
  keyof CepAddress & keyof CheckoutFormInput
>

export function DeliveryAddressForm() {
  const {
    control,
    register,
    setValue,
    setFocus,
    getValues,
    formState: { errors },
  } = useFormContext<CheckoutFormInput>()
  const { state, lookup } = useCepLookup()
  const lastLookedUp = useRef<string | null>(null)

  async function runLookup(rawCep: string) {
    const cep = normalizePostalCode(rawCep)
    lastLookedUp.current = cep
    const result = await lookup(cep)
    if (result.status !== 'success') return

    for (const field of AUTOFILL_FIELDS) {
      const value = result.address[field]
      if (value) setValue(field, value, { shouldValidate: true, shouldDirty: true })
    }
    setFocus(result.address.street ? 'number' : 'street')
  }

  const status = STATUS_MESSAGES[state.status]

  return (
    <Card aria-labelledby="address-title">
      <Heading>
        <MapPinIcon size={22} />
        <div>
          <h3 id="address-title">Endereço de entrega</h3>
          <p>Informe o endereço onde deseja receber seu pedido</p>
        </div>
      </Heading>

      <Grid>
        <Controller
          control={control}
          name="postalCode"
          render={({ field, fieldState }) => (
            <TextField
              className="cep"
              label="CEP"
              placeholder="00000-000"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={9}
              hint="O endereço é preenchido automaticamente"
              error={fieldState.error?.message}
              name={field.name}
              ref={field.ref}
              value={field.value ?? ''}
              onBlur={field.onBlur}
              onChange={(event) => {
                const formatted = formatPostalCode(event.target.value)
                field.onChange(formatted)
                const digits = normalizePostalCode(formatted)
                if (isCompletePostalCode(digits) && digits !== lastLookedUp.current) {
                  void runLookup(digits)
                }
              }}
            />
          )}
        />
        <div className="cep-action">
          <LookupButton
            type="button"
            onClick={() => void runLookup(getValues('postalCode') ?? '')}
            disabled={state.status === 'loading'}
          >
            {state.status === 'loading' ? 'Buscando…' : 'Buscar CEP'}
          </LookupButton>
        </div>

        <Status role="status" aria-live="polite" $tone={status.tone}>
          {status.text}
        </Status>

        <TextField
          className="street"
          label="Rua"
          autoComplete="address-line1"
          error={errors.street?.message}
          {...register('street')}
        />
        <TextField
          className="number"
          label="Número"
          inputMode="numeric"
          error={errors.number?.message}
          {...register('number')}
        />
        <TextField
          className="complement"
          label="Complemento"
          optional
          autoComplete="address-line2"
          error={errors.complement?.message}
          {...register('complement')}
        />
        <TextField
          className="neighborhood"
          label="Bairro"
          error={errors.neighborhood?.message}
          {...register('neighborhood')}
        />
        <TextField
          className="city"
          label="Cidade"
          autoComplete="address-level2"
          error={errors.city?.message}
          {...register('city')}
        />
        <TextField
          className="state"
          label="UF"
          maxLength={2}
          autoComplete="address-level1"
          error={errors.state?.message}
          {...register('state')}
        />
      </Grid>
    </Card>
  )
}
