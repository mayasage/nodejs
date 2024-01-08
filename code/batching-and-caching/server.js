import { createServer } from 'http'
// import totalSales from './server-without-batching-caching/totalSales.js'
// import totalSales from './server-with-batching/totalSalesBatch.js'
import totalSales from './server-with-caching/totalSalesCache.js'

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  const product = url.searchParams.get('product')

  console.log(`Processing query: ${url.search}`)
  const sum = await totalSales(product)

  res.setHeader('Content-Type', 'application/json')
  res.writeHead(200)
  res.end(
    JSON.stringify({
      product,
      sum,
    }) + '\n\n',
  )
}).listen(8000, () => console.log('Server started'))
