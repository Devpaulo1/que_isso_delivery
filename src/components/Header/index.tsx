import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logoDark from '@/assets/Log/logo-dark.svg'
import logoLight from '@/assets/Log/logo-light.svg'
import { CartBadge } from '@/components/CartBadge'
import { CartIcon } from '@/components/icons'
import { DeliveryLocationBadge } from '@/components/DeliveryLocationBadge'
import { LanguageSelector } from '@/components/LanguageSelector'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useCart } from '@/hooks/useCart'
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
    /* tagText: amarelo escuro com contraste AA para texto pequeno */
    color: ${({ theme }) => theme.colors.tagText};
  }
`

const Actions = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};

  ${({ theme }) => theme.media.sm} {
    gap: ${({ theme }) => theme.space[3]};
  }
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

export function Header() {
  const { themeName } = useTheme()
  const { totalUnits } = useCart()
  const { t } = useTranslation()
  const cartLabel =
    totalUnits === 0 ? t('header.cartEmpty') : t('header.cartWithItems', { count: totalUnits })

  return (
    <HeaderBar>
      <HeaderInner>
        <Brand to={ROUTES.home}>
          <img src={themeName === 'dark' ? logoDark : logoLight} alt="" width={40} height={40} />
          <span>
            QuE IssO <small>Delivery</small>
          </span>
          <span className="sr-only">{t('header.home')}</span>
        </Brand>

        <Actions aria-label={t('header.actions')}>
          <DeliveryLocationBadge />
          <LanguageSelector />
          <ThemeToggle />
          <CartLink to={ROUTES.checkout} aria-label={cartLabel}>
            <CartIcon size={22} />
            <CartBadge count={totalUnits} />
          </CartLink>
        </Actions>
      </HeaderInner>
    </HeaderBar>
  )
}
