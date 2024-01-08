import { createHash } from 'crypto'
import { createReadStream, createWriteStream } from 'fs'

const filename = process.argv[2]

const sha1Stream = createHash('sha1')
const md5Stream = createHash('md5')

const readStream = createReadStream(filename)

readStream.pipe(sha1Stream).pipe(createWriteStream(`${filename}.sha1`))
readStream.pipe(md5Stream).pipe(createWriteStream(`${filename}.md5`))
