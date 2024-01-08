import { createReadStream, createWriteStream } from 'fs'
import { createServer } from 'http'
import { basename } from 'path'
import { createGunzip } from 'zlib'

const server = createServer((req, res) => {
  const filename = basename(req.headers['x-filename'])
  const filepath = `aws-upload-folder/${filename}.gz`

  req.pipe(createWriteStream(filepath)).on('finish', () => {
    console.log(`File saved.`)
    res.end('OK\n')

    // Decompress
    createReadStream(filepath)
      .pipe(createGunzip())
      .on('error', err => console.log(`CreateGunzip Error: ${err}`))
      .pipe(createWriteStream(`aws-upload-folder/${filename}`))
      .on('finish', () => console.log(`File decompressed.`))
  })
})

server.listen(3000, () => console.log(`Server up on http://localhost:3000`))
