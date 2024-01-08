import { fork } from 'child_process'

class ProcessPool {
  constructor(file, maxPoolSize) {
    this.file = file
    this.maxPoolSize = maxPoolSize
    this.waitingForWorkerQueue = []
    this.freeWorkers = []
    this.activeWorkers = []
  }

  acquireWorker() {
    return new Promise((resolve, reject) => {
      let worker

      // If any worker is free, get that worker
      if (this.freeWorkers.length > 0) {
        worker = this.freeWorkers.pop()
        this.activeWorkers.push(worker)
        return resolve(worker)
      }

      // If a new Worker can't be forked, enqueue.
      if (this.activeWorkers.length >= this.maxPoolSize) {
        return this.waitingForWorkerQueue.push({ resolve, reject })
      }

      // Fork new Worker
      worker = fork(this.file)

      worker.once('message', message => {
        if (message === 'ready') {
          this.activeWorkers.push(worker)
          return resolve(worker)
        }

        worker.kill()
        reject(new Error('Improper process start'))
      })

      // Cleanup when worker exits.
      worker.once('exit', code => {
        console.log(`Worker exited with code ${code}`)
        this.activeWorkers = this.activeWorkers.filter(w => w !== worker)
        this.freeWorkers = this.freeWorkers.filter(w => w !== worker)
      })
    })
  }

  releaseWorker(worker) {
    if (this.waitingForWorkerQueue.length > 0) {
      const { resolve } = this.waitingForWorkerQueue.shift()
      return resolve(worker)
    }

    this.activeWorkers = this.activeWorkers.filter(w => w !== worker)
    this.freeWorkers.push(worker)
  }
}

export default ProcessPool
