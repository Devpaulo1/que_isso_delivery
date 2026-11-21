import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '@/components/Header'

const SkipLink = styled.a`
  position: absolute;
  left: ${({ theme }) => theme.space[4]};
  top: -100px;
  z-index: 100;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.brandPurpleDark};
  color: ${({ theme }) => theme.colors.onBrand};

  &:focus {
    top: ${({ theme }) => theme.space[2]};
  }
`

const Main = styled.main`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.layout.gutter} ${({ theme }) => theme.space[16]};

  &:focus {
    outline: none;
  }
`

export const MAIN_CONTENT_ID = 'conteudo'

export function PageLayout() {
  const { t } = useTranslation()
  return (
    <>
      <SkipLink href={`#${MAIN_CONTENT_ID}`}>{t('layout.skipLink')}</SkipLink>
      <Header />
      <Main id={MAIN_CONTENT_ID} tabIndex={-1}>
        <Outlet />
      </Main>
    </>
  )
}
