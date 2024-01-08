import asyncFilter from './async-filter.js'

const asyncFunction = (val, cb) =>
  setTimeout(() => cb(null, val % 2 === 0), 100)

asyncFilter([1, 2, 3, 4, 5], asyncFunction, res => {
  console.log(res)
})
