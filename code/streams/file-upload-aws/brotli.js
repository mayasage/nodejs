import { createReadStream, createWriteStream } from 'fs'
import { createBrotliCompress, createBrotliDecompress } from 'zlib'

const dest = 'aws-upload-folder/data.csv.gz.br'

createReadStream('data.csv.gz')
  .pipe(createBrotliCompress())
  .pipe(createWriteStream(dest))
  .on('finish', () => {
    console.log(`File saved.`)

    // Decompress
    createReadStream(dest)
      .pipe(createBrotliDecompress())
      .pipe(createWriteStream('aws-upload-folder/hellcat.br'))
      .on('finish', () => console.log(`File decompressed.`))
  })
