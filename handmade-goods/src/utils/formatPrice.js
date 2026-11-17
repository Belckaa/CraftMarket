import { useCurrencyContext } from '../context/useCurrencyContext'

export function useFormatPrice() {
  const { currency, rates } = useCurrencyContext()

  return (valueInUah) => {
    const rate = rates[currency]

    if (rate === null || rate === undefined) {
      const uahFormatter = new Intl.NumberFormat('uk-UA', {
        style: 'currency',
        currency: 'UAH',
        maximumFractionDigits: 0,
      })
      return `${uahFormatter.format(valueInUah)} (курс недоступний)`
    }

    const converted = valueInUah * rate
    return new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: currency === 'UAH' ? 0 : 2,
    }).format(converted)
  }
}
