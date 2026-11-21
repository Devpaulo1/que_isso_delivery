import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/paths'

export function Checkout() {
  return (
    <section>
      <h1>Checkout</h1>
      <Link to={ROUTES.success}>Confirmar pedido</Link>
    </section>
  )
}
