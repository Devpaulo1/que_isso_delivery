import '@testing-library/jest-dom/vitest'
import { cleanup, configure } from '@testing-library/react'
import { afterEach } from 'vitest'

// Submissões assíncronas (Zod + RHF) podem passar de 1s com cobertura/CI carregado.
configure({ asyncUtilTimeout: 4000 })

afterEach(() => {
  cleanup()
  window.localStorage.clear()
})
