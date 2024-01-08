import sleep from './utils/sleep.js'

const aFn = async n => {
  await sleep(1)
  return n
}

function* genFn() {
  try {
    const resA = yield aFn(1)
    console.log(`resA`, resA)
    const resB = yield aFn(2)
    console.log(`resB`, resB)
    const resC = yield aFn(3)
    console.log(`resC`, resC)
  } catch (e) {
    console.error(`Error inside genFn`, e)
  }
}

const createCancelableAsyncFn =
  genFn =>
  (...args) => {
    let requestCanceled = false
    const cancel = () => (requestCanceled = true)

    const genObj = genFn(...args)
    const promise = new Promise((res, rej) => {
      const c = async p => {
        if (requestCanceled) return rej(new Error('Canceled'))
        if (p.done) return res(p.value)

        try {
          const v = await p.value
          const newP = genObj.next(v)
          genObj.throw(new Error('fuck'))
          c(newP)
        } catch (e) {
          console.log(1)
          try {
            console.log(2)
            c(genObj.throw(e))
          } catch (e2) {
            console.log(3)
            rej(e2)
          }
        }
      }

      c({})
    })

    return { promise, cancel }
  }

try {
  const { promise, cancel } = createCancelableAsyncFn(genFn)()
  sleep(2, cancel)
  promise.catch(e => console.error('promise catch', e))
} catch (e) {
  console.log(`Error here...`, e)
}

// /* 1
// const o = genFn()
// o.throw(new Error('fire'))
// */

/* 2
const o = genFn()
new Promise((res, rej) => {
  o.throw(new Error('fire'))
})
*/

/* 3
const o = genFn()
new Promise((res, rej) => {
  async function f() {
    o.throw(new Error('fire'))
  }

  f()
})
*/

// const x = genFn => () => {
//   const o = genFn()
//   o.next()
//   o.throw('hi')
// }

// try {
//   x(genFn)()
// } catch (err) {
//   console.error('Catch call:', err)
// }
