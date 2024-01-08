import EventEmitter from 'events'

export default class Queue extends EventEmitter {
  constructor() {
    super()
    this.totalIndex = 0
    this.resetQueue()
  }

  resetQueue() {
    this._endIndex = -1
    this._startIndex = -1
    this._currentIndex = -1
    this._queue = Object.create(null)
    this.size = 0
  }

  enqueue(val) {
    this.totalIndex += 1

    this._endIndex += 1
    this.size += 1
    this._queue[this._endIndex] = val

    // One-time operation
    this._startIndex === -1 && (this._startIndex = 0)
    this._currentIndex === -1 && (this._currentIndex = 0)

    this.emit('enqueue', val)
  }

  peek() {
    return this._queue[this._currentIndex]
  }

  dequeue() {
    if (this.isEmpty()) {
      return
    }

    const val = this._queue[this._currentIndex]
    delete this._queue[this._currentIndex]

    this._currentIndex += 1
    this.size -= 1

    this._onDequeue()

    this.emit('dequeue', val)

    return val
  }

  _onDequeue() {
    if (this.isExhausted()) {
      return this.resetQueue()
    }

    const consumedMoreThanHalf = this._currentIndex > this._endIndex / 2
    consumedMoreThanHalf && this._resetQueueKeys()
  }

  _resetQueueKeys() {
    const newQueue = Object.create(null)
    for (let i = 0; i < this.size; i += 1) {
      newQueue[i] = this._queue[this._currentIndex + i]
    }

    this._startIndex = 0
    this._currentIndex = 0
    this._endIndex = this.size - 1
    this._queue = newQueue
  }

  isEmpty() {
    return this._currentIndex === -1
  }

  isExhausted() {
    return this._currentIndex > this._endIndex
  }

  resetTotalIndex() {
    this.totalIndex = 0
  }

  getEventNames() {
    return ['enqueue', 'dequeue']
  }
}
