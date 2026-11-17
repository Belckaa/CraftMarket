import { useContext } from 'react'
import { CurrencyContext } from './CurrencyContext'

export function useCurrencyContext() {
  const context = useContext(CurrencyContext)
  if (context === null) {
    throw new Error('useCurrencyContext має викликатися всередині <CurrencyProvider>.')
  }
  return context
}
