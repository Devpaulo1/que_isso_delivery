/** Remove tudo que não for dígito (sem truncar, para validação). */
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '')
}

/** Mantém somente dígitos, limitado a 8 (formato enviado ao ViaCEP). */
export function normalizePostalCode(value: string): string {
  return digitsOnly(value).slice(0, 8)
}

export function isCompletePostalCode(value: string): boolean {
  return /^\d{8}$/.test(normalizePostalCode(value))
}

/** Máscara visual 00000-000 aplicada enquanto o usuário digita. */
export function formatPostalCode(value: string): string {
  const digits = normalizePostalCode(value)
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits
}
