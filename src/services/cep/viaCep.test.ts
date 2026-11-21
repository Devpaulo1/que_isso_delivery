import {
  clearCepCache,
  createCepLookup,
  fetchAddressByCep,
  parseViaCepResponse,
} from '@/services/cep/viaCep'

const sePraca = {
  cep: '01001-000',
  logradouro: 'Praça da Sé',
  complemento: 'lado ímpar',
  bairro: 'Sé',
  localidade: 'São Paulo',
  uf: 'SP',
}

function jsonResponse(body: unknown, init: ResponseInit = { status: 200 }) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: { 'Content-Type': 'application/json' },
  })
}

const mockFetch = (impl: (url: string, init?: RequestInit) => Promise<Response>) =>
  vi.fn(impl) as unknown as typeof fetch & ReturnType<typeof vi.fn>

beforeEach(() => clearCepCache())

describe('fetchAddressByCep', () => {
  it('returns a normalized address on success', async () => {
    const fetchImpl = mockFetch(async () => jsonResponse(sePraca))
    const result = await fetchAddressByCep('01001-000', { fetchImpl })
    expect(fetchImpl).toHaveBeenCalledWith('https://viacep.com.br/ws/01001000/json/', expect.anything())
    expect(result).toEqual({
      status: 'success',
      address: {
        postalCode: '01001000',
        street: 'Praça da Sé',
        neighborhood: 'Sé',
        city: 'São Paulo',
        state: 'SP',
      },
    })
  })

  it.each(['', '123', '0100100a', '010010001'])('does not call the API for malformed CEP "%s"', async (cep) => {
    const fetchImpl = mockFetch(async () => jsonResponse(sePraca))
    expect(await fetchAddressByCep(cep, { fetchImpl })).toEqual({ status: 'invalid' })
    expect(fetchImpl).not.toHaveBeenCalled()
  })

  it.each([true, 'true'])('reports not found when erro is %s', async (erro) => {
    const fetchImpl = mockFetch(async () => jsonResponse({ erro }))
    expect(await fetchAddressByCep('99999999', { fetchImpl })).toEqual({ status: 'not-found' })
  })

  it('accepts partial responses (city-wide CEP without street)', async () => {
    const fetchImpl = mockFetch(async () =>
      jsonResponse({ cep: '13165-000', logradouro: '', bairro: '', localidade: 'Engenheiro Coelho', uf: 'SP' }),
    )
    const result = await fetchAddressByCep('13165000', { fetchImpl })
    expect(result).toMatchObject({
      status: 'success',
      address: { street: '', neighborhood: '', city: 'Engenheiro Coelho', state: 'SP' },
    })
  })

  it('maps network failures', async () => {
    const fetchImpl = mockFetch(async () => {
      throw new TypeError('Failed to fetch')
    })
    expect(await fetchAddressByCep('01001000', { fetchImpl })).toEqual({ status: 'error', reason: 'network' })
  })

  it('maps HTTP failures', async () => {
    const fetchImpl = mockFetch(async () => new Response('oops', { status: 503 }))
    expect(await fetchAddressByCep('01001000', { fetchImpl })).toEqual({ status: 'error', reason: 'http' })
  })

  it('maps HTTP 400 to invalid CEP', async () => {
    const fetchImpl = mockFetch(async () => new Response('', { status: 400 }))
    expect(await fetchAddressByCep('01001000', { fetchImpl })).toEqual({ status: 'invalid' })
  })

  it.each([
    ['invalid JSON', () => new Response('<html>', { status: 200 })],
    ['unexpected shape', () => jsonResponse(['nope'])],
    ['empty object', () => jsonResponse({})],
  ])('maps %s to a parse error', async (_label, make) => {
    const fetchImpl = mockFetch(async () => make())
    expect(await fetchAddressByCep('01001000', { fetchImpl })).toEqual({ status: 'error', reason: 'parse' })
  })

  it('caches successful lookups to avoid repeated requests', async () => {
    const fetchImpl = mockFetch(async () => jsonResponse(sePraca))
    await fetchAddressByCep('01001000', { fetchImpl })
    await fetchAddressByCep('01001-000', { fetchImpl })
    expect(fetchImpl).toHaveBeenCalledTimes(1)
  })

  it('reports aborted requests', async () => {
    const controller = new AbortController()
    const fetchImpl = mockFetch(
      (_url, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () =>
            reject(new DOMException('Aborted', 'AbortError')),
          )
        }),
    )
    const pending = fetchAddressByCep('01001000', { fetchImpl, signal: controller.signal })
    controller.abort()
    expect(await pending).toEqual({ status: 'aborted' })
  })
})

describe('createCepLookup', () => {
  it('cancels the previous request so stale responses are ignored', async () => {
    const resolvers: Array<(response: Response) => void> = []
    const fetchImpl = mockFetch(
      (_url, init) =>
        new Promise<Response>((resolve, reject) => {
          resolvers.push(resolve)
          init?.signal?.addEventListener('abort', () =>
            reject(new DOMException('Aborted', 'AbortError')),
          )
        }),
    )
    const client = createCepLookup(fetchImpl)
    const first = client.lookup('01001000')
    const second = client.lookup('20040020')

    resolvers[1](jsonResponse({ ...sePraca, cep: '20040-020', localidade: 'Rio de Janeiro', uf: 'RJ' }))

    expect(await first).toEqual({ status: 'aborted' })
    expect(await second).toMatchObject({ status: 'success', address: { city: 'Rio de Janeiro' } })
  })
})

describe('parseViaCepResponse', () => {
  it('rejects non-objects', () => {
    expect(parseViaCepResponse(null, '01001000')).toBeNull()
    expect(parseViaCepResponse('x', '01001000')).toBeNull()
  })
})
