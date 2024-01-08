import { promisify } from 'util'

const setTimeoutP = promisify(setTimeout)

const sleep = async (s, fn) => {
  await setTimeoutP(s * 1000)
  if (fn) return fn()
}

export default sleep
