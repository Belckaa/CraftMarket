import { useCurrencyContext } from '@/context/useCurrencyContext'
import './CurrencySwitcher.css'

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrencyContext()

  return (
    <select
      className="currency-switcher"
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
    >
      <option value="UAH">₴ UAH</option>
      <option value="USD">$ USD</option>
      <option value="EUR">€ EUR</option>
      <option value="GBP">£ GBP</option>
    </select>
  )
}
