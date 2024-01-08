import { createWriteStream } from 'fs'
import { loggingWritable } from './logging-writable.js'

const writable = createWriteStream('data.txt')
const writableProxy = loggingWritable(writable)

writableProxy.write('First chunk')
writableProxy.write('Second chunk')
writable.write('This is not logged')
writableProxy.end()
