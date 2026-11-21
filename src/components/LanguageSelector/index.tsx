import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { LANGUAGES } from '@/i18n'

const Select = styled.select`
  height: 2.5rem;
  padding: 0 ${({ theme }) => theme.space[2]};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.brandPurpleLight};
  color: ${({ theme }) => theme.colors.brandPurpleDark};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.buttonHover};
  }
`

export function LanguageSelector() {
  const { t, i18n } = useTranslation()
  const id = useId()

  return (
    <>
      <label htmlFor={id} className="sr-only">
        {t('language.label')}
      </label>
      <Select
        id={id}
        value={i18n.resolvedLanguage}
        onChange={(event) => void i18n.changeLanguage(event.target.value)}
        title={t('language.label')}
      >
        {LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code} lang={code}>
            {code.toUpperCase()} · {label}
          </option>
        ))}
      </Select>
    </>
  )
}
