import { createReadStream } from 'fs'
import { sleep } from '../read-a-csv/sleep.js'
import config from '../read-a-csv/config.js'

const readStream = createReadStream(config.FILE_PATH, {
  highWaterMark: 10,
  encoding: 'utf-8',
})

const consume = async () => {
  let chunk

  while (null !== (chunk = readStream.read())) {
    await sleep(1)
    console.log(chunk)
  }

  readStream.once('readable', consume)
}

readStream.once('readable', consume)

readStream.on('end', () => console.log('Last readable event was fired'))
