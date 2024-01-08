import asyncReduce from './async-reduce.js'

const asyncFunction = (prev, cur, cb) =>
  setTimeout(() => cb(null, prev + cur), 100)

asyncReduce([1, 2, 3, 4, 5], asyncFunction, res => {
  console.log(res)
})
