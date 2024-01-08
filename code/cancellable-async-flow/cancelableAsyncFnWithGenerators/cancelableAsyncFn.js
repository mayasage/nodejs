import asyncFn from '../asyncFn.js'
import createCancelableAsyncFn from './createCancelableAsyncFn.js'

const cancelableAsyncFn = createCancelableAsyncFn(function* () {
  const resA = yield asyncFn('A')
  console.log('resA', resA)
  const resB = yield asyncFn('B')
  console.log('resB', resB)
  const resC = yield asyncFn('C')
  console.log('resC', resC)
})

export default cancelableAsyncFn
