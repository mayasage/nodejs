import CancelError from '../cancelError.js'

const createCancelableAsyncFn =
  genFn =>
  (...args) => {
    const genObj = genFn(...args)

    let cancelRequested = false
    const cancel = () => (cancelRequested = true)

    const promise = new Promise((res, rej) => {
      const next = async prev => {
        if (cancelRequested) return rej(new CancelError())
        if (prev.done) return res(prev.value)

        try {
          next(genObj.next(await prev.value))
        } catch (err) {
          try {
            next(genObj.throw(err))
          } catch (err2) {
            rej(err2)
          }
        }
      }

      next({})
    })

    return { cancel, promise }
  }

export default createCancelableAsyncFn
