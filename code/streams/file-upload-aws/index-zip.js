import { PassThrough } from 'stream'
import upload from './upload-axios.js'
import { createReadStream } from 'fs'
import { createGzip } from 'zlib'

const placeholder = new PassThrough()
upload('data.csv', placeholder)
createReadStream('data.csv').pipe(createGzip()).pipe(placeholder)
