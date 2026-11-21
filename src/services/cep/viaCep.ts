import { normalizePostalCode } from '@/utils/postalCode'

export const VIACEP_BASE_URL = 'https://viacep.com.br/ws'

/** Contrato simplificado da resposta do ViaCEP (TECH_SPEC §8.2). */
export interface ViaCepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean | 'true'
}

/** Endereço normalizado; campos ausentes na API chegam como string vazia. */
export interface CepAddress {
  postalCode: string
  street: string
  neighborhood: string
  city: string
  state: string
}

export type CepErrorReason = 'network' | 'http' | 'parse'

export type CepLookupResult =
  | { status: 'success'; address: CepAddress }
  | { status: 'invalid' }
  | { status: 'not-found' }
  | { status: 'error'; reason: CepErrorReason }
  | { status: 'aborted' }

interface LookupOptions {
  signal?: AbortSignal
  fetchImpl?: typeof fetch
}

const cache = new Map<string, CepAddress>()

/** Limpa o cache em memória (usado em testes). */
export function clearCepCache(): void {
  cache.clear()
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readString(record: Record<string, unknown>, key: string): string {
  const value = record[key]
  return typeof value === 'string' ? value.trim() : ''
}

/**
 * Interpreta a resposta desconhecida do ViaCEP.
 * Retorna `not-found` para `erro: true` e `null` quando o formato é inválido.
 */
export function parseViaCepResponse(
  data: unknown,
  requestedCep: string,
): CepLookupResult | null {
  if (!isRecord(data)) return null
  if (data.erro === true || data.erro === 'true') return { status: 'not-found' }

  const address: CepAddress = {
    postalCode: normalizePostalCode(readString(data, 'cep')) || requestedCep,
    street: readString(data, 'logradouro'),
    neighborhood: readString(data, 'bairro'),
    city: readString(data, 'localidade'),
    state: readString(data, 'uf').toUpperCase(),
  }

  const hasAnyField = [address.street, address.neighborhood, address.city, address.state].some(Boolean)
  return hasAnyField ? { status: 'success', address } : null
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException
    ? error.name === 'AbortError'
    : isRecord(error) && error.name === 'AbortError'
}

/**
 * Consulta o ViaCEP. Nunca lança erro: todos os cenários viram um resultado tipado.
 * O componente não monta URL nem interpreta a resposta diretamente.
 */
export async function fetchAddressByCep(
  rawCep: string,
  { signal, fetchImpl = fetch }: LookupOptions = {},
): Promise<CepLookupResult> {
  const cep = rawCep.replace(/\D/g, '')
  if (!/^\d{8}$/.test(cep)) return { status: 'invalid' }

  const cached = cache.get(cep)
  if (cached) return { status: 'success', address: cached }

  let response: Response
  try {
    response = await fetchImpl(`${VIACEP_BASE_URL}/${cep}/json/`, { signal })
  } catch (error) {
    return isAbortError(error) || signal?.aborted
      ? { status: 'aborted' }
      : { status: 'error', reason: 'network' }
  }

  if (signal?.aborted) return { status: 'aborted' }
  // ViaCEP responde 400 para formato inválido.
  if (response.status === 400) return { status: 'invalid' }
  if (!response.ok) return { status: 'error', reason: 'http' }

  let data: unknown
  try {
    data = await response.json()
  } catch (error) {
    return isAbortError(error) ? { status: 'aborted' } : { status: 'error', reason: 'parse' }
  }

  if (signal?.aborted) return { status: 'aborted' }

  const result = parseViaCepResponse(data, cep)
  if (!result) return { status: 'error', reason: 'parse' }
  if (result.status === 'success') cache.set(cep, result.address)
  return result
}

/**
 * Cliente que cancela a consulta anterior a cada nova chamada,
 * evitando que uma resposta antiga sobrescreva a mais recente.
 */
export function createCepLookup(fetchImpl?: typeof fetch) {
  let controller: AbortController | null = null

  return {
    lookup(cep: string): Promise<CepLookupResult> {
      controller?.abort()
      const current = new AbortController()
      controller = current
      return fetchAddressByCep(cep, { signal: current.signal, fetchImpl })
    },
    cancel(): void {
      controller?.abort()
      controller = null
    },
  }
}
