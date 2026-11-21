import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from '@/contexts/CartContext'
import { DeliveryLocationProvider } from '@/contexts/DeliveryLocationContext'
import { AppThemeProvider } from '@/contexts/ThemeContext'
import { AppRoutes } from '@/routes/AppRoutes'

export function App() {
  return (
    <AppThemeProvider>
      <DeliveryLocationProvider>
        <CartProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </CartProvider>
      </DeliveryLocationProvider>
    </AppThemeProvider>
  )
}
