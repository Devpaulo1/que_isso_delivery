import { zodResolver } from '@hookform/resolvers/zod'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { DeliveryAddressForm } from '@/components/DeliveryAddressForm'
import {
  checkoutDefaultValues,
  checkoutSchema,
  type CheckoutFormData,
  type CheckoutFormInput,
} from '@/schemas/checkoutSchema'
import { clearCepCache } from '@/services/cep/viaCep'
import { renderWithProviders } from '@/tests/helpers/render'

function Harness({ onSubmit, children }: { onSubmit: (data: CheckoutFormData) => void; children?: ReactNode }) {
  const methods = useForm<CheckoutFormInput, unknown, CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { ...checkoutDefaultValues, paymentMethod: 'cash' },
  })
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <DeliveryAddressForm />
        {children}
        <button type="submit">Enviar</button>
      </form>
    </FormProvider>
  )
}

const field = (name: string) => screen.getByLabelText(name, { exact: false, selector: 'input' })

function mockViaCep(body: unknown, status = 200) {
  return vi
    .spyOn(globalThis, 'fetch')
    .mockImplementation(async () => new Response(JSON.stringify(body), { status }))
}

const sePraca = {
  cep: '01001-000',
  logradouro: 'Praça da Sé',
  bairro: 'Sé',
  localidade: 'São Paulo',
  uf: 'SP',
}

beforeEach(() => clearCepCache())

describe('DeliveryAddressForm', () => {
  it('masks the CEP and fills the address when it is complete', async () => {
    const user = userEvent.setup()
    const fetchSpy = mockViaCep(sePraca)
    renderWithProviders(<Harness onSubmit={vi.fn()} />)

    await user.type(field('CEP'), '01001000')

    expect(field('CEP')).toHaveValue('01001-000')
    await waitFor(() => expect(field('Rua')).toHaveValue('Praça da Sé'))
    expect(field('Bairro')).toHaveValue('Sé')
    expect(field('Cidade')).toHaveValue('São Paulo')
    expect(field('UF')).toHaveValue('SP')
    expect(screen.getByText(/endereço encontrado/i)).toBeInTheDocument()
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    expect(field('Número')).toHaveFocus()
  })

  it('never overwrites number and complement', async () => {
    const user = userEvent.setup()
    mockViaCep({ ...sePraca, complemento: 'lado ímpar' })
    renderWithProviders(<Harness onSubmit={vi.fn()} />)

    await user.type(field('Número'), '42')
    await user.type(field('Complemento'), 'Casa 2')
    await user.type(field('CEP'), '01001000')

    await waitFor(() => expect(field('Rua')).toHaveValue('Praça da Sé'))
    expect(field('Número')).toHaveValue('42')
    expect(field('Complemento')).toHaveValue('Casa 2')
  })

  it('shows a loading state while querying', async () => {
    const user = userEvent.setup()
    let resolve: (response: Response) => void = () => {}
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      () => new Promise<Response>((r) => (resolve = r)),
    )
    renderWithProviders(<Harness onSubmit={vi.fn()} />)

    await user.type(field('CEP'), '01001000')
    expect(screen.getByText('Buscando endereço…')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Buscando…' })).toBeDisabled()

    resolve(new Response(JSON.stringify(sePraca)))
    await waitFor(() => expect(field('Rua')).toHaveValue('Praça da Sé'))
  })

  it('reports CEP not found and keeps manual entry possible', async () => {
    const user = userEvent.setup()
    mockViaCep({ erro: true })
    renderWithProviders(<Harness onSubmit={vi.fn()} />)

    await user.type(field('CEP'), '99999999')
    expect(await screen.findByText(/CEP não encontrado/)).toBeInTheDocument()
    await user.type(field('Rua'), 'Rua Manual')
    expect(field('Rua')).toHaveValue('Rua Manual')
  })

  it('reports API failures and allows retrying', async () => {
    const user = userEvent.setup()
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new TypeError('offline'))
    renderWithProviders(<Harness onSubmit={vi.fn()} />)

    await user.type(field('CEP'), '01001000')
    expect(await screen.findByText(/não foi possível consultar o CEP/i)).toBeInTheDocument()

    fetchSpy.mockResolvedValueOnce(new Response(JSON.stringify(sePraca)))
    await user.click(screen.getByRole('button', { name: 'Buscar CEP' }))
    await waitFor(() => expect(field('Rua')).toHaveValue('Praça da Sé'))
  })

  it('keeps fields not provided by the API for manual entry (partial response)', async () => {
    const user = userEvent.setup()
    mockViaCep({ cep: '13165-000', logradouro: '', bairro: '', localidade: 'Engenheiro Coelho', uf: 'SP' })
    renderWithProviders(<Harness onSubmit={vi.fn()} />)

    await user.type(field('CEP'), '13165000')
    await waitFor(() => expect(field('Cidade')).toHaveValue('Engenheiro Coelho'))
    expect(field('Rua')).toHaveValue('')
    expect(field('Rua')).toHaveFocus()
  })

  it('shows accessible errors on submit', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    renderWithProviders(<Harness onSubmit={onSubmit} />)

    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(onSubmit).not.toHaveBeenCalled()
    const street = field('Rua')
    expect(street).toHaveAttribute('aria-invalid', 'true')
    expect(street).toHaveAccessibleDescription(/Informe a rua/)
    expect(field('CEP')).toHaveAccessibleDescription(/Informe o CEP/)
    expect(field('Complemento')).not.toHaveAttribute('aria-invalid')
  })

  it('submits normalized data', async () => {
    const user = userEvent.setup()
    mockViaCep(sePraca)
    const onSubmit = vi.fn()
    renderWithProviders(<Harness onSubmit={onSubmit} />)

    await user.type(field('CEP'), '01001000')
    await waitFor(() => expect(field('Rua')).toHaveValue('Praça da Sé'))
    await user.type(field('Número'), '10')
    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    await waitFor(() => expect(onSubmit).toHaveBeenCalled())
    expect(onSubmit.mock.calls[0][0]).toEqual({
      postalCode: '01001000',
      street: 'Praça da Sé',
      number: '10',
      complement: undefined,
      neighborhood: 'Sé',
      city: 'São Paulo',
      state: 'SP',
      paymentMethod: 'cash',
    })
  })
})
