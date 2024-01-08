import totalSalesRaw from '../server-without-batching-caching/totalSales.js'

const runningPromises = new Map()

const totalSales = async product => {
  const inRunning = runningPromises.has(product)

  if (inRunning) {
    console.log('Batching')
    return runningPromises.get(product)
  }

  const p = totalSalesRaw(product)
  runningPromises.set(product, p)
  p.finally(() => runningPromises.delete(product))
  return p
}

export default totalSales
