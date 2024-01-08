import { createReadStream, createWriteStream } from 'fs'
import { Readable, Transform } from 'stream'

const concatFiles = (destPath, srcPaths) =>
  new Promise((resolve, reject) => {
    const writeStream = new createWriteStream(destPath)

    Readable.from(srcPaths)
      .pipe(
        new Transform({
          objectMode: true,
          transform(filepath, encoding, cb) {
            const readStream = createReadStream(filepath)
            readStream.pipe(writeStream, { end: false })
            readStream.on('error', cb)
            readStream.on('end', cb)
          },
        }),
      )
      .on('error', reject)
      .on('finish', resolve)
  })

export default concatFiles
