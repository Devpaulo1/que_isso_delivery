import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { QuantityInput } from '@/components/QuantityInput'
import { renderWithProviders } from '@/tests/helpers/render'

function Controlled({ initial = 1, onChange }: { initial?: number; onChange?: (n: number) => void }) {
  const [value, setValue] = useState(initial)
  return (
    <QuantityInput
      label="Latte"
      value={value}
      max={10}
      onChange={(next) => {
        setValue(next)
        onChange?.(next)
      }}
    />
  )
}

const field = () => screen.getByLabelText('Quantidade de Latte', { selector: 'input' })

describe('QuantityInput', () => {
  it('increments and decrements within limits', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Controlled />)
    const minus = screen.getByRole('button', { name: 'Diminuir quantidade de Latte' })
    const plus = screen.getByRole('button', { name: 'Aumentar quantidade de Latte' })

    expect(minus).toBeDisabled()
    await user.click(plus)
    await user.click(plus)
    expect(field()).toHaveValue('3')
    await user.click(minus)
    expect(field()).toHaveValue('2')
  })

  it('disables increment at the maximum', () => {
    renderWithProviders(<Controlled initial={10} />)
    expect(screen.getByRole('button', { name: 'Aumentar quantidade de Latte' })).toBeDisabled()
  })

  it('accepts a typed positive integer', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderWithProviders(<Controlled onChange={onChange} />)
    await user.clear(field())
    await user.type(field(), '7')
    expect(onChange).toHaveBeenLastCalledWith(7)
  })

  it.each(['0', '-3', '2.5', 'abc', '50'])('never emits an invalid value when typing "%s"', async (text) => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderWithProviders(<Controlled onChange={onChange} />)
    await user.clear(field())
    await user.type(field(), text)
    for (const [value] of onChange.mock.calls as Array<[number]>) {
      expect(Number.isInteger(value)).toBe(true)
      expect(value).toBeGreaterThanOrEqual(1)
      expect(value).toBeLessThanOrEqual(10)
    }
  })

  it('restores the last valid value on blur', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Controlled initial={4} />)
    await user.clear(field())
    await user.tab()
    expect(field()).toHaveValue('4')
  })

  it('keeps decrement enabled at the minimum when onDecrement is provided', async () => {
    const user = userEvent.setup()
    const onDecrement = vi.fn()
    renderWithProviders(<QuantityInput label="Latte" value={1} onDecrement={onDecrement} readOnly />)
    await user.click(screen.getByRole('button', { name: 'Diminuir quantidade de Latte' }))
    expect(onDecrement).toHaveBeenCalledOnce()
  })
})
