import { Route, Routes } from 'react-router-dom'
import { PageLayout } from '@/components/PageLayout'
import { Checkout } from '@/pages/Checkout'
import { Home } from '@/pages/Home'
import { Success } from '@/pages/Success'
import { ROUTES } from '@/routes/paths'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.checkout} element={<Checkout />} />
        <Route path={ROUTES.success} element={<Success />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
