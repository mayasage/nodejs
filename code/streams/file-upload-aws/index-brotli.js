import { PassThrough } from 'stream'
import upload from './upload-node-fetch.js'
import { createReadStream } from 'fs'
import { createBrotliCompress } from 'zlib'

const monitor1 = new PassThrough()
monitor1.on('data', () => console.log('read data'))
const monitor2 = new PassThrough()
monitor2.on('data', () => console.log('compressed data'))

const placeholder = new PassThrough()
upload('data.csv', placeholder)
createReadStream('data.csv')
  .pipe(monitor1)
  .pipe(createBrotliCompress())
  .pipe(monitor2)
  .pipe(placeholder)
