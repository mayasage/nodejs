/**
 * Asynchronous Filter
 */

const result = []

const recurse = (array, index, asyncFunction, cb) => {
  if (index === array.length) {
    return process.nextTick(cb.bind(null, result))
  }

  const val = array[index]

  asyncFunction(val, (err, res) => {
    if (err) {
      return cb(err)
    }

    if (res) {
      result.push(val)
    }

    recurse(array, index + 1, asyncFunction, cb)
  })
}

const asyncFilter = (array, asyncFunction, cb) =>
  recurse(array, 0, asyncFunction, cb)

export default asyncFilter
