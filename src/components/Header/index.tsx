import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logoDark from '@/assets/Log/logo-dark.svg'
import logoLight from '@/assets/Log/logo-light.svg'
import { CartIcon } from '@/components/icons'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useTheme } from '@/hooks/useTheme'
import { ROUTES } from '@/routes/paths'

const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.overlay};
`

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[4]};
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.layout.gutter};

  ${({ theme }) => theme.media.md} {
    padding-block: ${({ theme }) => theme.space[8]};
  }
`

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radii.md};

  img {
    width: 2.5rem;
    height: 2.5rem;
  }

  span {
    font-family: ${({ theme }) => theme.fonts.title};
    font-weight: ${({ theme }) => theme.fontWeights.extraBold};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    line-height: 1;
    color: ${({ theme }) => theme.colors.brandPurpleDark};
  }

  small {
    display: block;
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.colors.brandYellowDark};
  }
`

const Actions = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
`

const CartLink = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.brandYellowLight};
  color: ${({ theme }) => theme.colors.tagText};
  transition: filter ${({ theme }) => theme.transitions.fast};

  &:hover {
    filter: brightness(0.95);
  }
`

interface HeaderProps {
  /** Conteúdo exibido sobre o link do carrinho (ex.: CartBadge). */
  cartBadge?: ReactNode
  cartLabel?: string
}

export function Header({ cartBadge, cartLabel = 'Carrinho' }: HeaderProps) {
  const { themeName } = useTheme()

  return (
    <HeaderBar>
      <HeaderInner>
        <Brand to={ROUTES.home} aria-label="QuE IssO — página inicial">
          <img src={themeName === 'dark' ? logoDark : logoLight} alt="" width={40} height={40} />
          <span>
            QuE
            <small>IssO</small>
          </span>
        </Brand>

        <Actions aria-label="Ações">
          <ThemeToggle />
          <CartLink to={ROUTES.checkout} aria-label={cartLabel}>
            <CartIcon size={22} />
            {cartBadge}
          </CartLink>
        </Actions>
      </HeaderInner>
    </HeaderBar>
  )
}
