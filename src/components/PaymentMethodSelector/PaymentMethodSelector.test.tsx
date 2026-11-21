import { zodResolver } from '@hookform/resolvers/zod'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProvider, useForm } from 'react-hook-form'
import { PaymentMethodSelector } from '@/components/PaymentMethodSelector'
import { checkoutSchema, type CheckoutFormData, type CheckoutFormInput } from '@/schemas/checkoutSchema'
import { renderWithProviders } from '@/tests/helpers/render'

const validAddress = {
  postalCode: '01001000',
  street: 'Praça da Sé',
  number: '1',
  complement: '',
  neighborhood: 'Sé',
  city: 'São Paulo',
  state: 'SP',
}

function Harness({ onSubmit }: { onSubmit: (data: CheckoutFormData) => void }) {
  const methods = useForm<CheckoutFormInput, unknown, CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: validAddress,
  })
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <PaymentMethodSelector />
        <button type="submit">Enviar</button>
      </form>
    </FormProvider>
  )
}

describe('PaymentMethodSelector', () => {
  it('offers credit, debit and cash with none preselected', () => {
    renderWithProviders(<Harness onSubmit={vi.fn()} />)
    const group = screen.getByRole('group', { name: /pagamento/i })
    expect(group).toBeInTheDocument()
    for (const name of ['Cartão de crédito', 'Cartão de débito', 'Dinheiro']) {
      expect(screen.getByRole('radio', { name })).not.toBeChecked()
    }
  })

  it('requires a payment method', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    renderWithProviders(<Harness onSubmit={onSubmit} />)
    await user.click(screen.getByRole('button', { name: 'Enviar' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Selecione uma forma de pagamento')
    expect(screen.getByRole('group', { name: /pagamento/i })).toHaveAccessibleDescription(
      /Selecione uma forma de pagamento/,
    )
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits the selected method without starting any transaction', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    renderWithProviders(<Harness onSubmit={onSubmit} />)

    await user.click(screen.getByRole('radio', { name: 'Cartão de débito' }))
    expect(screen.getByRole('radio', { name: 'Cartão de débito' })).toBeChecked()
    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    await waitFor(() => expect(onSubmit).toHaveBeenCalled())
    expect(onSubmit.mock.calls[0][0].paymentMethod).toBe('debit')
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('supports keyboard selection with arrow keys', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Harness onSubmit={vi.fn()} />)
    await user.click(screen.getByRole('radio', { name: 'Cartão de crédito' }))
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('radio', { name: 'Cartão de débito' })).toBeChecked()
  })
})
