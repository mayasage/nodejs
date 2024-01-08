import { Readable } from 'stream'
import Chance from 'chance'

const chance = new Chance()
let emittedBytes = 0

const randomStream = new Readable({
  /**
   *  "read" (here) === "_read" (when class extend is used)
   *  "push" is same
   *  This is just a convenience feature.
   */
  read(size) {
    const chunk = chance.string({ length: size })
    this.push(chunk, 'utf-8')
    emittedBytes += chunk.length
    if (chance.bool({ likelihood: 5 })) {
      this.push(null)
    }
  },
})

// Use it directly
randomStream
  .on('data', chunk => {
    chunk = chunk.toString().trim()
    console.log(`Chunk received (${chunk.length} bytes): ${chunk}`)
  })
  .on('end', () => {
    console.log(`Produced ${emittedBytes} bytes of random data`)
  })
