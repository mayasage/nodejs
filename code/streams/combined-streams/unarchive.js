import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream'
import { createDecompressAndDecrypt } from './combined-streams.js'
import { readFile } from 'fs/promises'

const [, , pwd, iv, src] = process.argv
const dst = 'hello.csv.xhz'.replace(/\.[^/.]*$/, '')

readFile(iv)
  .then(iv => {
    pipeline(
      createReadStream(src),
      createDecompressAndDecrypt(pwd, iv),
      createWriteStream(dst),
      err => {
        if (err) {
          console.error(err)
          process.exit(1)
        }

        console.log(`Done`)
      },
    )
  })
  .catch(err => console.error(err))
