import cancelableAsyncFn from './cancelableAsyncFn.js'
import createCancelWrapper from './createCancelWrapper.js'
import CancelError from '../cancelError.js'

const { cancel, cancelWrapper } = createCancelWrapper()

cancelableAsyncFn(cancelWrapper).catch(err => {
  if (err instanceof CancelError) console.log('AsyncFn cancelled')
  else console.error(err)
})

setTimeout(cancel, 100)
