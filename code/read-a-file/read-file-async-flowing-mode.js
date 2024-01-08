import { createReadStream } from 'fs'
import { sleep } from '../read-a-csv/sleep.js'
import config from '../read-a-csv/config.js'

const readStream = createReadStream(config.FILE_PATH, {
  highWaterMark: 10,
  encoding: 'utf-8',
})

/**
 *  TLDR: Async away as much as you want before the "read()" method is called.
 *
 *  You can do any Asynchronous operation before calling "read()".
 *  Because as soon as you call it, the internal Buffer will free up, new data
 *  will be pushed into it by the "createReadStream", filling it up again,
 *  which, will again trigger the "readable" event.
 */
readStream.on('data', async chunk => {
  readStream.pause()
  await sleep(1)
  console.log(chunk)
  readStream.resume()
})

readStream.on('end', () => console.log('Last readable event was fired'))
