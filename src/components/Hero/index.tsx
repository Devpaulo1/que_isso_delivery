import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'
import styled, { type DefaultTheme } from 'styled-components'
import heroImage from '@/assets/hero.png'
import { CartIcon, CoffeeIcon, PackageIcon, TimerIcon } from '@/components/icons'

type Tone = 'yellowDark' | 'text' | 'yellow' | 'purple'

const toneColors: Record<Tone, (theme: DefaultTheme) => { bg: string; fg: string }> = {
  yellowDark: (t) => ({ bg: t.colors.brandYellowDark, fg: t.colors.onYellow }),
  text: (t) => ({ bg: t.colors.text, fg: t.colors.background }),
  yellow: (t) => ({ bg: t.colors.brandYellow, fg: t.colors.onYellow }),
  purple: (t) => ({ bg: t.colors.brandPurpleDark, fg: t.colors.onBrand }),
}

const highlights: Array<{ tone: Tone; icon: ReactNode; text: `hero.${string}` }> = [
  { tone: 'yellowDark', icon: <CartIcon size={16} />, text: 'hero.simplePurchase' },
  { tone: 'text', icon: <PackageIcon size={16} />, text: 'hero.packaging' },
  { tone: 'yellow', icon: <TimerIcon size={16} />, text: 'hero.fastDelivery' },
  { tone: 'purple', icon: <CoffeeIcon size={16} />, text: 'hero.freshCoffee' },
]

const Section = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.space[8]};
  align-items: center;
  padding-block: ${({ theme }) => theme.space[8]};

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: 1fr 476px;
    gap: ${({ theme }) => theme.space[12]};
    padding-block: ${({ theme }) => theme.space[20]};
  }
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.extraBold};

  ${({ theme }) => theme.media.md} {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }
`

const Subtitle = styled.p`
  margin-top: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.subtitle};

  ${({ theme }) => theme.media.md} {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`

const List = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  margin-top: ${({ theme }) => theme.space[10]};
  list-style: none;

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: ${({ theme }) => theme.space[10]};
  }

  li {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space[3]};
  }
`

const IconBadge = styled.span<{ $tone: Tone }>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $tone }) => toneColors[$tone](theme).bg};
  color: ${({ theme, $tone }) => toneColors[$tone](theme).fg};
`

const Illustration = styled.img`
  width: 100%;
  max-width: 476px;
  height: auto;
  margin: 0 auto;
`

export function Hero() {
  const { t } = useTranslation()
  return (
    <Section aria-labelledby="hero-title">
      <div>
        <Title id="hero-title">{t('hero.title')}</Title>
        <Subtitle>{t('hero.subtitle')}</Subtitle>
        <List>
          {highlights.map(({ tone, icon, text }) => (
            <li key={text}>
              <IconBadge $tone={tone}>{icon}</IconBadge>
              {t(text)}
            </li>
          ))}
        </List>
      </div>
      <Illustration src={heroImage} alt="" width={476} height={357} />
    </Section>
  )
}
