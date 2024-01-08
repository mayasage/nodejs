import { open, close, read } from 'fs'
import { promisify } from 'util'

export const openP = promisify(open)
export const readP = promisify(read)
export const closeP = promisify(close)
