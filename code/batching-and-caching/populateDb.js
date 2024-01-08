import { Level } from 'level'
import { nanoid } from 'nanoid'

const db = new Level('main-db')
const salesDb = db.sublevel('sales', { valueEncoding: 'json' })

const products = ['book', 'game', 'app', 'song', 'movie']

async function populate() {
  const batch = []

  for (let i = 0; i < 100000; i++) {
    batch.push({
      type: 'put',
      sublevel: salesDb,
      key: nanoid(),
      value: {
        amount: Math.ceil(Math.random() * 100),
        product: products[Math.floor(Math.random() * 5)],
      },
    })
  }

  await db.batch(batch)

  console.log('DB populated')
}

populate()
