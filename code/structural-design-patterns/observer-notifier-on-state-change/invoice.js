import { createObservable } from './create-observable.js'

const invoice = {
  subtotal: 100,
  discount: 10,
  tax: 20,
}

const calculateTotal = () => invoice.subtotal - invoice.discount + invoice.tax

let total = calculateTotal()
console.log(`Starting total: ${total}`)

const obsInvoice = createObservable(
  invoice,
  ({ property, currentValue, previousValue }) => {
    total = calculateTotal()
    console.log(
      `TOTAL: ${total} (${property} changed: ${previousValue} -> ${currentValue})`,
    )
  },
)

obsInvoice.subtotal = 200 // TOTAL: 210
obsInvoice.discount = 20 // TOTAL: 200
obsInvoice.discount = 20 // no change: doesn't notify
obsInvoice.tax = 30
// TOTAL: 210
console.log(`Final total: ${total}`)
