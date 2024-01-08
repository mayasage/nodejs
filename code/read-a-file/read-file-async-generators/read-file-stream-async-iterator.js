import { createReadStream } from 'fs'
import config from '../config.js'
import { sleep } from '../sleep.js'

const readStream = createReadStream(config.FILE_PATH, {
  highWaterMark: 1,
  encoding: 'utf-8',
})

for await (const chunk of readStream) {
  await sleep(1)
  console.log(chunk)
}
