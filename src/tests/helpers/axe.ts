import axe, { type Result } from 'axe-core'

/**
 * Executa o axe-core no container renderizado.
 * `color-contrast` é desligado porque o jsdom não calcula layout/cores;
 * o contraste é verificado em `src/styles/themes.test.ts`.
 */
export async function runAxe(container: Element): Promise<Result[]> {
  // jsdom não implementa canvas (usado pelo axe para detectar ícones de fonte).
  HTMLCanvasElement.prototype.getContext = () => null

  const results = await axe.run(container, {
    rules: {
      'color-contrast': { enabled: false },
      // Regiões são avaliadas na página completa, não em fragmentos.
      region: { enabled: false },
    },
  })
  return results.violations
}

export function formatViolations(violations: Result[]): string {
  return violations
    .map((v) => `${v.id}: ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).join('\n  ')}`)
    .join('\n')
}
