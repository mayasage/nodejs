import cancelableAsyncFn from './cancelableAsyncFn.js'
import CancelError from '../cancelError.js'

const cancelObj = { cancelRequested: false }

cancelableAsyncFn(cancelObj).catch(err => {
  if (err instanceof CancelError) console.log('AsyncFn cancelled')
  else console.error(err)
})

setTimeout(() => (cancelObj.cancelRequested = true), 100)
