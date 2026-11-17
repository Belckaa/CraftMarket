import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { CurrencyContext, RATES } from './CurrencyContext'

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('UAH')

  const value = useMemo(
    () => ({ currency, setCurrency, rates: RATES }),
    [currency]
  )

  return <CurrencyContext value={value}>{children}</CurrencyContext>
}

CurrencyProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
