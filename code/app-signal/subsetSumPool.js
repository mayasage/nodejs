import { EventEmitter } from 'events'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import workerpool from 'workerpool'

const __dirname = dirname(fileURLToPath(import.meta.url))
const workerFile = join(__dirname, 'subsetSumWorker.js')
const pool = workerpool.pool(workerFile)

let sum = 0
let set = []

export class SubsetSum extends EventEmitter {
  constructor(_sum, _set) {
    super()
    sum = _sum
    set = _set
  }

  async start() {
    await pool.exec('subsetSum', [sum, set], {
      // retransmit event
      on: payload => this.emit(payload.event, payload.data),
    })
  }
}
