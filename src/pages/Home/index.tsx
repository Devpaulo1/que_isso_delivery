import { CoffeeCatalog } from '@/components/CoffeeCatalog'
import { Hero } from '@/components/Hero'
import { useCart } from '@/hooks/useCart'

export function Home() {
  const { addItem } = useCart()

  return (
    <>
      <Hero />
      <CoffeeCatalog onAddToCart={addItem} />
    </>
  )
}
