import { promisify } from 'util'

const setTimeoutP = promisify(setTimeout)

export const sleep = seconds => setTimeoutP(seconds * 1000)
