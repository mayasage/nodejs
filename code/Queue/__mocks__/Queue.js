export default class Queue {
  #endIndex
  #startIndex
  #currentIndex
  #queue

  constructor() {
    this.totalIndex = 0
    this.resetQueue()
  }

  /* Enabled for Jest Testing */
  get endIndex() {
    return this.#endIndex
  }

  get startIndex() {
    return this.#startIndex
  }

  get currentIndex() {
    return this.#currentIndex
  }

  get queue() {
    return this.#queue
  }

  resetQueue() {
    this.#endIndex = -1
    this.#startIndex = -1
    this.#currentIndex = -1
    this.#queue = Object.create(null)
    this.size = 0
  }

  enqueue(val) {
    this.totalIndex += 1

    this.#endIndex += 1
    this.size += 1
    this.#queue[this.#endIndex] = val

    // One-time operation
    this.#startIndex === -1 && (this.#startIndex = 0)
    this.#currentIndex === -1 && (this.#currentIndex = 0)
  }

  /**
   *  Returns undefined if the Queue is empty.
   */
  peek() {
    return this.#queue[this.#currentIndex]
  }

  /**
   *  May change currentIndex.
   */
  dequeue() {
    if (this.isEmpty()) {
      return
    }

    const val = this.#queue[this.#currentIndex]
    delete this.#queue[this.#currentIndex]

    this.#currentIndex += 1
    this.size -= 1

    this.#onDequeue()

    return val
  }

  #onDequeue() {
    if (this.isExhausted()) {
      this.resetQueue()
      return
    }

    const consumedMoreThanHalf = this.#currentIndex > this.#endIndex / 2
    consumedMoreThanHalf && this.#resetQueueKeys()
  }

  #resetQueueKeys() {
    const newQueue = Object.create(null)
    for (let i = 0; i < this.size; i += 1) {
      newQueue[i] = this.#queue[this.#currentIndex + i]
    }

    this.#startIndex = 0
    this.#currentIndex = 0
    this.#endIndex = this.size - 1
    this.#queue = newQueue
  }

  isEmpty() {
    const hasNoItem = this.#currentIndex === -1
    return hasNoItem
  }

  isExhausted() {
    const isExhausted = this.#currentIndex > this.#endIndex
    return isExhausted
  }

  resetTotalIndex() {
    this.totalIndex = 0
  }
}
