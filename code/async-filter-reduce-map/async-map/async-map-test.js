import asyncMap from './async-map.js'

const asyncFunction = (val, cb) => setTimeout(() => cb(null, val * 2), 100)

asyncMap([1, 2, 3, 4, 5], asyncFunction, res => {
  console.log(res)
})
