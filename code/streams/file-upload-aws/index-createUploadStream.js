import { createReadStream } from 'fs'
import createUploadStream from './createUploadStream.js'
import { createBrotliCompress } from 'zlib'

createReadStream('data.csv')
  .pipe(createBrotliCompress())
  .pipe(createUploadStream('data.csv'))
