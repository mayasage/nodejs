import totalSalesRaw from '../server-without-batching-caching/totalSales.js'

const CACHE_TTL = 30 * 1000 // 30 seconds TTL
const cache = new Map()

const totalSales = async product => {
  const inCache = cache.get(product)

  if (inCache) {
    console.log('Cache hit')
    return cache.get(product)
  }

  const p = totalSalesRaw(product)
  cache.set(product, p)

  p.then(
    () => setTimeout(() => cache.delete(product), CACHE_TTL),
    err => {
      cache.delete(product)
      throw err
    },
  )

  return p
}

export default totalSales
