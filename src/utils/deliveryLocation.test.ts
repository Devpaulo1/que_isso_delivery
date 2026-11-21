import { formatDeliveryLocation, hasDeliveryLocation } from '@/utils/deliveryLocation'

describe('deliveryLocation', () => {
  it('aceita qualquer cidade/UF preenchidos', () => {
    expect(hasDeliveryLocation({ city: 'Salvador', state: 'BA' })).toBe(true)
    expect(hasDeliveryLocation({ city: 'São Paulo', state: 'SP' })).toBe(true)
    expect(hasDeliveryLocation({ city: 'Engenheiro Coelho', state: 'SP' })).toBe(true)
  })

  it('rejeita localização vazia ou incompleta', () => {
    expect(hasDeliveryLocation(null)).toBe(false)
    expect(hasDeliveryLocation({ city: '', state: 'BA' })).toBe(false)
    expect(hasDeliveryLocation({ city: 'Salvador', state: '' })).toBe(false)
  })

  it('formata cidade e UF para o selo', () => {
    expect(formatDeliveryLocation({ city: ' Salvador ', state: ' ba ' })).toBe('Salvador, BA')
    expect(formatDeliveryLocation({ city: 'São Paulo', state: 'SP' })).toBe('São Paulo, SP')
  })
})
