import { createReadStream, createWriteStream } from 'fs'
import { createGzip } from 'zlib'

const filePath = process.argv[2]

createReadStream(filePath)
  .pipe(createGzip())
  .pipe(createWriteStream(`${filePath}.zip`))
  .on('finish', () => console.log('done man'))
