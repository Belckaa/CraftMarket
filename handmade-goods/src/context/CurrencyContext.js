import { createContext } from 'react'

export const RATES = {
  UAH: 1,
  USD: 0.025,
  EUR: 0.023,
  GBP: null, // Варіант 6: Імітація відсутнього курсу
}

export const CurrencyContext = createContext(null)
CurrencyContext.displayName = 'CurrencyContext'
