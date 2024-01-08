import { createGunzip, createGzip } from 'zlib'
import { LazyReadable, LazyWritable } from './lazystream.js'
import { createReadStream, createWriteStream } from 'fs'

const lazyReadable = new LazyReadable(() => createReadStream('sample.csv'))
const lazyWritable = new LazyWritable(() => createWriteStream('sample.csv.gz'))

lazyReadable
  .pipe(createGzip())
  .pipe(lazyWritable)
  .on('finish', () => {
    const lazyReadable = new LazyReadable(() =>
      createReadStream('sample.csv.gz'),
    )
    const lazyWritable = new LazyWritable(() =>
      createWriteStream('sampled.csv'),
    )

    lazyReadable.pipe(createGunzip()).pipe(lazyWritable)
  })
