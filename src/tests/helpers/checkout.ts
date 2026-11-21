import { screen, waitFor } from '@testing-library/react'
import type { UserEvent } from '@testing-library/user-event'

export const viaCepSePraca = {
  cep: '01001-000',
  logradouro: 'Praça da Sé',
  complemento: '',
  bairro: 'Sé',
  localidade: 'São Paulo',
  uf: 'SP',
}

export function mockViaCepSuccess(body: unknown = viaCepSePraca) {
  return vi
    .spyOn(globalThis, 'fetch')
    .mockImplementation(async () => new Response(JSON.stringify(body), { status: 200 }))
}

export const inputByLabel = (label: string) =>
  screen.getByLabelText(label, { exact: false, selector: 'input' })

/** Preenche o checkout com CEP consultado no ViaCEP (mockado) e pagamento. */
export async function fillCheckoutForm(user: UserEvent, payment = 'Cartão de crédito') {
  await user.type(inputByLabel('CEP'), '01001000')
  await waitFor(() => expect(inputByLabel('Rua')).toHaveValue('Praça da Sé'))
  await user.type(inputByLabel('Número'), '100')
  await user.type(inputByLabel('Complemento'), 'Sala 2')
  await user.click(screen.getByRole('radio', { name: payment }))
}
