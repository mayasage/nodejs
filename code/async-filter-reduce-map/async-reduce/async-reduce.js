/**
 * Asynchronous Reduce
 */

let result = 0

const recurse = (array, index, asyncFunction, cb) => {
  if (index === array.length) {
    return process.nextTick(cb.bind(null, result))
  }

  const val = array[index]

  asyncFunction(result, val, (err, res) => {
    if (err) {
      return cb(err)
    }

    result = res
    recurse(array, index + 1, asyncFunction, cb)
  })
}

const asyncReduce = (array, asyncFunction, cb) =>
  recurse(array, 0, asyncFunction, cb)

export default asyncReduce
