import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './context/CartProvider'
import { CurrencyProvider } from './context/CurrencyProvider'
import './index.css'

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    return worker.start({ onUnhandledRequest: 'bypass' })
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <CurrencyProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </CurrencyProvider>
    </StrictMode>,
  )
})
