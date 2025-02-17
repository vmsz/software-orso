import { format } from 'number-currency-format'

function formatToBRL(value) {
  const formattedValue = format(value, {
    currency: 'R$',
    currencyPosition: 'LEFT',
    thousandSeparator: '.',
    decimalSeparator: ',',
  })
  return formattedValue
}

export { formatToBRL }
