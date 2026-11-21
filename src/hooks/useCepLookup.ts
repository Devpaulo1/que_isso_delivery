import { useCallback, useEffect, useState } from 'react'
import { createCepLookup, type CepAddress, type CepLookupResult } from '@/services/cep/viaCep'

export type CepLookupState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; address: CepAddress }
  | { status: 'invalid' }
  | { status: 'not-found' }
  | { status: 'error' }

/**
 * Coordena a consulta de CEP para a UI: estado de carregamento,
 * cancelamento de consultas anteriores e limpeza ao desmontar.
 */
export function useCepLookup() {
  const [client] = useState(() => createCepLookup())
  const [state, setState] = useState<CepLookupState>({ status: 'idle' })

  useEffect(() => () => client.cancel(), [client])

  const lookup = useCallback(
    async (cep: string): Promise<CepLookupResult> => {
      setState({ status: 'loading' })
      const result = await client.lookup(cep)
      // Resposta obsoleta: uma consulta mais nova já assumiu o estado.
      if (result.status === 'aborted') return result
      setState(result.status === 'error' ? { status: 'error' } : result)
      return result
    },
    [client],
  )

  const reset = useCallback(() => {
    client.cancel()
    setState({ status: 'idle' })
  }, [client])

  return { state, lookup, reset }
}
