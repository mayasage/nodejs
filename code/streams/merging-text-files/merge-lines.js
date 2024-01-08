import { createReadStream, createWriteStream } from 'fs'
import split from 'split'

const dst = process.argv[2]
const srcs = process.argv.slice(3)

const dstStream = createWriteStream(dst)

let count = 0
for (const src of srcs) {
  count += 1
  const srcStream = createReadStream(src)

  srcStream.on('end', () => {
    count -= 1

    if (count === 0) {
      dstStream.end()
      console.log(`Done`)
    }
  })

  srcStream.pipe(split(line => line + '\n')).pipe(dstStream, { end: false })
}
