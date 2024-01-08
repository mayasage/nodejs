import { Readable } from 'stream'
import Chance from 'chance'

const chance = new Chance()

export class RandomStream extends Readable {
  /**
   *  Possible Options Parameters
   *  - encoding (default null) - used to convert Buffer
   *  - objectMode (default false)
   *  - highWaterMark (default 16KB) - internal buffer size
   */
  constructor(options) {
    super(options)
    this.emittedBytes = 0
  }

  _read(size) {
    const chunk = chance.string({ length: size })
    this.push(chunk, 'utf-8')
    this.emittedBytes += chunk.length
    if (chance.bool({ likelihood: 5 })) {
      this.push(null)
    }
  }
}
