import { Route, Routes } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { Checkout } from '@/pages/Checkout'
import { Success } from '@/pages/Success'
import { ROUTES } from '@/routes/paths'

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<Home />} />
      <Route path={ROUTES.checkout} element={<Checkout />} />
      <Route path={ROUTES.success} element={<Success />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
