import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { AppRoutes } from '@/routes/AppRoutes'
import { GlobalStyle } from '@/styles/GlobalStyle'
import { lightTheme } from '@/styles/themes'

export function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}
