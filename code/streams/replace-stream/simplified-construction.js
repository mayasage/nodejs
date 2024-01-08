import { Transform } from 'stream'

const search = 'World'
const replace = 'Node.js'
let tail = ''

const replaceStream = new Transform({
  encoding: 'utf-8',

  transform(chunk, encoding, cb) {
    const chunk2 = (tail + chunk).replaceAll(search, replace)

    const chunkToPushEndIndex = chunk2.length - search.length
    const chunkToNotPushStartIndex = chunkToPushEndIndex + 1

    this.push(chunk2.substring(0, chunkToPushEndIndex + 1))
    tail = chunk2.substring(chunkToNotPushStartIndex)

    cb()
  },

  flush(cb) {
    this.push(tail)
    cb()
  },
})

replaceStream.on('data', chunk => console.log(chunk))

replaceStream.write('Hello W')
replaceStream.write('orld X')
replaceStream.end()
