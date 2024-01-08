import { EventEmitter } from 'events'
import ProcessPool from './ProcessPool.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
let workerFile = join(__dirname, 'workers', 'subsetSumProcessWorker.js')
const workerPool = new ProcessPool(workerFile, 2)

export class SubsetSum extends EventEmitter {
  constructor(sum, set) {
    super()
    this.sum = sum
    this.set = set
  }

  async start() {
    const worker = await workerPool.acquireWorker()

    worker.send({ sum: this.sum, set: this.set })

    const onMessage = msg => {
      if (msg.event === 'end') {
        worker.removeListener('message', onMessage)
        workerPool.releaseWorker(worker)
      }

      this.emit(msg.event, msg.data)
    }

    worker.on('message', onMessage)
  }
}

export default SubsetSum
