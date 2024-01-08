import { describe, test, expect, jest } from '@jest/globals'
import Queue from './Queue.js'
jest.mock('./Queue.js')

const expectInsides = (queue, { size, currentIndex, startIndex, endIndex }) => {
  expect(queue.size).toBe(size)
  expect(queue.currentIndex).toBe(currentIndex)
  expect(queue.startIndex).toBe(startIndex)
  expect(queue.endIndex).toBe(endIndex)
  expect(Object.keys(queue.queue).length).toBe(size)
}

const thousandThousand = () => {
  const queue = new Queue()
  const size = 1000000

  // Enqueue
  for (let i = 0; i < size; i += 1) {
    queue.enqueue(i)
  }

  expectInsides(queue, {
    size,
    currentIndex: 0,
    startIndex: 0,
    endIndex: 999999,
  })

  // Dequeue
  // ResetQueueKeys is not run yet...
  const lessThanHalf = size / 2 - 1
  for (let i = 0; i < lessThanHalf; i += 1) {
    queue.dequeue()
  }

  expectInsides(queue, {
    size: size - lessThanHalf,
    currentIndex: lessThanHalf,
    startIndex: 0,
    endIndex: 999999,
  })

  // Trigger ResetQueueKeys...
  const half = size / 2
  queue.dequeue()

  expectInsides(queue, {
    size: half,
    currentIndex: 0,
    startIndex: 0,
    endIndex: half - 1,
  })

  expect(queue.totalIndex).toBe(size)
}

const deqEnqDeq = () => {
  const queue = new Queue()

  // Dequeue
  expect(queue.dequeue()).toBe(undefined)

  expectInsides(queue, {
    size: 0,
    currentIndex: -1,
    startIndex: -1,
    endIndex: -1,
  })

  // Enqueue
  queue.enqueue(10)

  expectInsides(queue, {
    size: 1,
    currentIndex: 0,
    startIndex: 0,
    endIndex: 0,
  })

  expect(queue.peek()).toBe(10)

  // Dequeue
  // Remember that ResetQueue will also get triggered
  expect(queue.dequeue()).toBe(10)

  expectInsides(queue, {
    size: 0,
    currentIndex: -1,
    startIndex: -1,
    endIndex: -1,
  })

  expect(queue.totalIndex).toBe(1)
  queue.resetTotalIndex()
  expect(queue.totalIndex).toBe(0)
}

describe('Test Queue', () => {
  test('one dequeue-enqueue-dequeue', deqEnqDeq)
  test('on 1000,000 items', thousandThousand)
})
