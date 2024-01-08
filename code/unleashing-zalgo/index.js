import { readFile, readFileSync } from 'fs'

/**
 * If the File is already read once, then return its data from Cache.
 * Otherwise, read the file & update the Cache.
 */

const cache = new Map()

const inconsistentRead = (path, cb) => {
  const inCache = cache.has(path)

  if (inCache) {
    // Synchronous
    const data = cache.get(path)
    cb(data)
  } else {
    // Asynchronous
    readFile(path, 'utf-8', (err, data) => {
      if (err) return console.log(err)
      cache.set(path, data)
      cb(data)
    })
  }
}

/**
 * Purely Synchronous.
 *
 * @param String} path
 * @returns
 */
function consistentReadSync(path) {
  const inCache = cache.has(path)

  if (inCache) {
    // Synchronous
    const data = cache.get(path)
    return data
  } else {
    // Synchronous
    const data = readFileSync(path, 'utf8')
    cache.set(path, data)
    return data
  }
}

/**
 * Purely Asynchronous.
 *
 * @param {String} path
 * @param {Function} callback
 */
function consistentReadAsync(path, cb) {
  const inCache = cache.has(path)

  if (inCache) {
    // Asynchronous
    const data = cache.get(path)
    console.log('Cache found')
    /**
     * deferred callback invocation
     *
     * Do later, but before any actual I/O is performed.
     * The callback will fire before going back to the event loop.
     *
     * These go to the microtask queue, which runs before the event loop.
     */
    process.nextTick(() => cb(data))
    console.log('I got printed')
  } else {
    // Asynchronous
    readFile(path, 'utf8', (err, data) => {
      if (err) return console.log(err)
      cache.set(path, data)
      cb(data)
    })
  }
}

/**
 * Multiple Listeners are waiting for the File to be read.
 * When the File is read, its data is passed to ALL the Listeners.
 *
 * @param {String} path Absolute path of the file.
 * @returns
 */
const createFileReader = (path) => {
  const listeners = []

  // inconsistentRead(path, (data) =>
  //   /**
  //    * Passes data to each Listener.
  //    */
  //   listeners.forEach((listener) => listener(data)),
  // )

  consistentReadAsync(path, (data) =>
    /**
     * Passes data to each Listener.
     */
    listeners.forEach((listener) => listener(data)),
  )

  return {
    /**
     * Adds a Listener.
     *
     * @param {Function} listener
     * @returns
     */
    onDataReady: (listener) => listeners.push(listener),
  }
}

// Calling the Function

const reader1 = createFileReader('data.txt')
reader1.onDataReady((data) => {
  console.log(`First call data: ${data}`)

  const reader2 = createFileReader('data.txt')
  reader2.onDataReady((data) => console.log(`Second call data: ${data}`))
})
