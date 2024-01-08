import { fork } from 'child_process'
import { connect } from 'net'

/**
 *  Buffer Format:
 *    - 1 byte Channel ID
 *    - 4 bytes data length
 *    - data
 *
 *  @param {*} chunk
 */
const makeBuffer = (chunk, channelId) => {
  const outBuff = Buffer.alloc(1 + 4 + chunk.length)

  outBuff.writeUInt8(channelId, 0)
  outBuff.writeUInt32BE(chunk.length, 1)
  chunk.copy(outBuff, 5)

  return outBuff
}

const mux = (srcs, dst) => {
  let count = srcs.length

  for (let i = 0; i < srcs.length; i++) {
    console.log(`src ${i}`)

    srcs[i]
      .on('readable', function () {
        let chunk

        while ((chunk = this.read()) !== null) {
          const outBuff = makeBuffer(chunk, i)
          console.log(`Sending packet to channel: ${i}`)
          dst.write(outBuff)
        }
      })
      .on('end', () => {
        count -= 1

        if (count === 0) {
          console.log('Client Done')
          dst.end()
        }
      })
  }
}

// ?
const socket = connect(3000, () => {
  const child = fork(process.argv[2], process.argv.slice(3), { silent: true })
  mux([child.stdout, child.stderr], socket)
})
