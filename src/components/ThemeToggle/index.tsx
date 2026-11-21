import styled from 'styled-components'
import { MoonIcon, SunIcon } from '@/components/icons'
import { useTheme } from '@/hooks/useTheme'

const ToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.brandPurpleLight};
  color: ${({ theme }) => theme.colors.brandPurpleDark};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.buttonHover};
  }
`

export function ThemeToggle() {
  const { themeName, toggleTheme } = useTheme()
  const isDark = themeName === 'dark'
  const label = isDark ? 'Ativar tema claro' : 'Ativar tema escuro'

  return (
    <ToggleButton type="button" onClick={toggleTheme} aria-label={label} title={label}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </ToggleButton>
  )
}
