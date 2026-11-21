import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/paths'

export function Success() {
  return (
    <section>
      <h1>Pedido confirmado</h1>
      <Link to={ROUTES.home}>Voltar para a Home</Link>
    </section>
  )
}
