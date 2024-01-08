import { Level } from 'level'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const db = new Level(join(__dirname, '../main-db'))
const salesDb = db.sublevel('sales', { valueEncoding: 'json' })

const totalSales = async product => {
  const now = Date.now()
  let sum = 0
  for await (const transaction of salesDb.values()) {
    const match = transaction.product === product
    if (match) sum += transaction.amount
  }
  console.log(`totalSales() took: ${Date.now() - now}ms`)
  return sum
}

export default totalSales
