import { RandomStream } from './RandomStream.js'

const randomStream = new RandomStream()

randomStream
  .on('data', chunk => {
    chunk = chunk.toString().trim()
    console.log(`Chunk received (${chunk.length} bytes): ${chunk}`)
  })
  .on('end', () => {
    console.log(`Produced ${randomStream.emittedBytes} bytes of random data`)
  })
