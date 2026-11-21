import { useTranslation } from 'react-i18next'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { CoffeeCard } from '@/components/CoffeeCard'
import { coffees as catalog } from '@/data/coffees'
import type { Coffee, CoffeeCategory } from '@/types/coffee'
import { filterCoffeesByCategory, getAvailableCategories } from '@/utils/catalog'

const Section = styled.section`
  margin-top: ${({ theme }) => theme.space[8]};
`

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};

  ${({ theme }) => theme.media.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    color: ${({ theme }) => theme.colors.subtitle};
  }
`

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
`

const FilterButton = styled.button`
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme }) => theme.colors.brandYellow};
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.tagText};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &[aria-pressed='true'] {
    background: ${({ theme }) => theme.colors.brandYellowLight};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`

const Grid = styled.ul`
  display: grid;
  /* 17.25rem = largura mínima do card (rodapé preço + quantidade + botão); com 15rem o card vazava e encostava no vizinho */
  grid-template-columns: repeat(auto-fill, minmax(min(17.25rem, 100%), 1fr));
  /* row gap maior: a xícara sobe para fora do card */
  gap: ${({ theme }) => theme.space[16]} ${({ theme }) => theme.space[8]};
  margin-top: ${({ theme }) => theme.space[10]};
  list-style: none;

  > li {
    display: flex;

    > article {
      flex: 1;
    }
  }
`

export interface CoffeeCatalogProps {
  coffees?: readonly Coffee[]
  onAddToCart?: (coffeeId: Coffee['id'], quantity: number) => void
}

export function CoffeeCatalog({ coffees = catalog, onAddToCart }: CoffeeCatalogProps) {
  const { t } = useTranslation()
  const [category, setCategory] = useState<CoffeeCategory | null>(null)
  const categories = useMemo(() => getAvailableCategories(coffees), [coffees])
  const visible = useMemo(() => filterCoffeesByCategory(coffees, category), [coffees, category])

  return (
    <Section aria-labelledby="catalog-title">
      <Heading>
        <h2 id="catalog-title">{t('catalog.title')}</h2>
        <Filters role="group" aria-label={t('catalog.filter')}>
          {categories.map((item) => (
            <FilterButton
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory((current) => (current === item ? null : item))}
            >
              {t(`categories.${item}`)}
            </FilterButton>
          ))}
        </Filters>
      </Heading>

      <Grid aria-label={t('catalog.list')}>
        {visible.map((coffee) => (
          <li key={coffee.id}>
            <CoffeeCard coffee={coffee} onAddToCart={onAddToCart} />
          </li>
        ))}
      </Grid>
    </Section>
  )
}
