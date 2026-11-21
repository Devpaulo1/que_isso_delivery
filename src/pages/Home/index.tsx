import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/paths'

export function Home() {
  return (
    <section>
      <h1>Home</h1>
      <Link to={ROUTES.checkout}>Ir para o checkout</Link>
    </section>
  )
}
