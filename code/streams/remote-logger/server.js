import { createWriteStream } from 'fs'
import { createServer } from 'net'

const demux = (src, dsts) => {
  let channelId
  let dataLength

  src
    .on('readable', () => {
      let chunk

      if (!channelId) {
        chunk = src.read(1)
        channelId = chunk && chunk.readUInt8(0)

        if (!channelId && channelId !== 0) {
          return
        }
      }

      if (!dataLength) {
        chunk = src.read(4)
        dataLength = chunk && chunk.readUInt32BE(0)

        if (!dataLength) {
          return
        }
      }

      chunk = src.read(dataLength)
      if (chunk === null) {
        return
      }

      dsts[channelId].write(chunk)

      channelId = null
      dataLength = null
    })
    .on('end', () => {
      dsts.forEach(dst => dst.end())
      console.log(`Server Done`)
    })
}

// ?
const server = createServer(socket => {
  const stdoutStream = createWriteStream('stdout.log')
  const stderrStream = createWriteStream('stderr.log')
  demux(socket, [stdoutStream, stderrStream])
})
server.listen(3000, () => console.log(`Server up on port 3000.`))
