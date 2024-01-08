/**
 * Asynchronous Map
 */

const result = []

const iterate = (array, index, asyncFunction, cb) => {
  if (index === array.length) {
    return process.nextTick(cb.bind(null, result)) // Makes this function Purely Async
  }

  const val = array[index]

  asyncFunction(val, (err, res) => {
    if (err) {
      return cb(err)
    }

    result.push(res)

    iterate(array, index + 1, asyncFunction, cb)
  })
}

const asyncMap = (array, asyncFunction, cb) =>
  iterate(array, 0, asyncFunction, cb)

export default asyncMap
