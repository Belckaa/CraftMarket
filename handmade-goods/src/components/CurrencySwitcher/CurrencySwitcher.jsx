import { useCurrencyContext } from '@/context/useCurrencyContext'

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrencyContext()

  return (
    <select
      className="rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-ink outline-none focus:border-clay-600 focus:ring-1 focus:ring-clay-600 shadow-sm cursor-pointer"
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
