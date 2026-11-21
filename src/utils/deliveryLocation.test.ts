import { isSaoPauloSp } from '@/utils/deliveryLocation'

describe('isSaoPauloSp', () => {
  it('reconhece São Paulo/SP', () => {
    expect(isSaoPauloSp({ city: 'São Paulo', state: 'SP' })).toBe(true)
  })

  it('ignora acento, caixa e espaços', () => {
    expect(isSaoPauloSp({ city: '  SAO PAULO ', state: ' sp ' })).toBe(true)
  })

  it('rejeita outra cidade ou outro estado', () => {
    expect(isSaoPauloSp({ city: 'Campinas', state: 'SP' })).toBe(false)
    expect(isSaoPauloSp({ city: 'São Paulo', state: 'RJ' })).toBe(false)
    expect(isSaoPauloSp(null)).toBe(false)
  })
})
