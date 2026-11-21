/**
 * Acesso seguro ao localStorage.
 * O conteúdo do storage é tratado como entrada NÃO confiável: todo valor lido
 * passa por um parser/validador que devolve `null` quando o dado é inválido.
 */

export type StorageParser<T> = (value: unknown) => T | null

function getStorage(): Storage | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null
  } catch {
    return null
  }
}

export function readStorage<T>(key: string, parse: StorageParser<T>): T | null {
  const storage = getStorage()
  if (!storage) return null

  let raw: string | null
  try {
    raw = storage.getItem(key)
  } catch {
    return null
  }
  if (raw === null) return null

  try {
    return parse(JSON.parse(raw) as unknown)
  } catch {
    return null
  }
}

export function writeStorage(key: string, value: unknown): boolean {
  const storage = getStorage()
  if (!storage) return false
  try {
    storage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

