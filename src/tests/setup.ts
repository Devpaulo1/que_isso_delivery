import '@testing-library/jest-dom/vitest'
import { cleanup, configure } from '@testing-library/react'
import { afterEach } from 'vitest'
import i18n, { DEFAULT_LANGUAGE } from '@/i18n'

// Submissões assíncronas (Zod + RHF) podem passar de 1s com cobertura/CI carregado.
configure({ asyncUtilTimeout: 4000 })

afterEach(() => {
  cleanup()
  // Antes do clear: trocar o idioma grava a preferência no storage.
  void i18n.changeLanguage(DEFAULT_LANGUAGE)
  window.localStorage.clear()
})
