import CancelError from '../cancelError.js'

const createCancelWrapper = () => {
  let cancelRequested = false
  const cancel = () => (cancelRequested = true)

  const cancelWrapper = (asyncFn, ...args) => {
    if (cancelRequested) return Promise.reject(new CancelError())
    return asyncFn(...args)
  }

  return { cancel, cancelWrapper }
}

export default createCancelWrapper
