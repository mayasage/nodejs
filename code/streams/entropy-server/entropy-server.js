import { createServer } from 'http'
import Chance from 'chance'

const chance = new Chance()

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })

  const generateMore = () => {
    while (chance.bool({ likelihood: 95 })) {
      const randomChunk = chance.string({
        length: 16 * 1024 - 1,
      })

      const shouldContinue = res.write(`${randomChunk}\n`)
      if (!shouldContinue) {
        console.log('backpressure')
        return res.once('drain', generateMore)
      }
    }
    res.end('\n')
  }

  generateMore()

  res.on('finish', () => console.log('All data sent'))
})

server.listen(3000, () => console.log(`Server listening on port 3000`))
