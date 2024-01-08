import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream'
import { createCompressAndEncrypt } from './combined-streams.js'
import { randomBytes } from 'crypto'
import { writeFile } from 'fs/promises'

const [, , pwd, src] = process.argv
const dst = `${src}.gz.enc`
const iv = randomBytes(16)

pipeline(
  createReadStream(src),
  createCompressAndEncrypt(pwd, iv),
  createWriteStream(dst),
  err => {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    writeFile('iv', iv)
      .then(() => console.log(`Done`))
      .catch(err => console.error(err))
  },
)
