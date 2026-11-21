import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { readStorage, writeStorage, type StorageParser } from '@/utils/storage'

/**
 * Estado sincronizado com o localStorage.
 * A leitura passa pelo `parse` (dado não confiável) e cai no `fallback` quando inválido.
 * Regras de domínio ficam no parser de quem usa o hook, não aqui.
 */
export function useLocalStorage<T>(
  key: string,
  parse: StorageParser<T>,
  fallback: T | (() => T),
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const stored = readStorage(key, parse)
    if (stored !== null) return stored
    return typeof fallback === 'function' ? (fallback as () => T)() : fallback
  })

  useEffect(() => {
    writeStorage(key, value)
  }, [key, value])

  const set = useCallback<Dispatch<SetStateAction<T>>>((next) => setValue(next), [])

  return [value, set]
}
