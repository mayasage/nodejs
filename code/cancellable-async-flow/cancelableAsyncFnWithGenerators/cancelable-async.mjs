// Cancelable Async

import { error, info, log } from 'console'
import sleep from '../sleep.js'

const roboError = (e = 'Robocop') => {
  throw new Error(e)
}

/*
  When generator function throws error...

  function* genFn() {
    try {
      const resA = yield sleep(1, () => 'A')
      roboError() // generator function throws error
      const resB = yield sleep(1, () => resA + 'B')
      const resC = yield sleep(1, () => resB + 'C')
      return resC
    } catch (e) {
      info('Cleaning it up !', e)

      // These errors will be caught by promises.
      // roboError('blyat') // send a custom error
      throw e // just forward the original error
    }
  }
*/

function* genFn() {
  try {
    const resA = yield sleep(1, () => 'A')
    const resB = yield sleep(1, () => resA + 'B')
    const resC = yield sleep(1, () => resB + 'C')
    return resC
  } catch (e) {
    info('Cleaning it up !', e)
  }
}

let i = 0

/* When Error is thrown from the caller of the genFn */
const makeCancelableAsyncFn =
  genFn =>
  (...args) => {
    const genObj = genFn(...args)
    const callNext = p => genObj.next(p)

    let cancelReq = false
    const cancel = () => (cancelReq = true)

    const promise = new Promise((resolve, reject) => {
      const fn = async p => {
        try {
          if (cancelReq) throw new Error('Cancel')
          if (p.done) return resolve(p.value)

          // if (i === 2) roboError()
          // i += 1
          log('pass', p)
          fn(callNext(await p.value)) // tail recursion... no stack overflow
          // (if it was sync)
        } catch (e) {
          log('caught... throwing into genObj')
          try {
            genObj.throw(e) // this allows the the genObj to throw a custom error
          } catch (e2) {
            log('reject 2')
            return reject(e2) // if genObj throws error, forward that error
          }
          reject(e)
          log('done throwing')
        }
      }

      fn({})
    })

    return { promise, cancel }
  }

const { promise, cancel } = makeCancelableAsyncFn(genFn)()
promise.then(r => log('r', r)).catch(e => error(`Caught e`, e))
// sleep(1, cancel)
