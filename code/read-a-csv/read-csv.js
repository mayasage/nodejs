import { parse } from 'csv-parse'
import { createReadStream } from 'fs'
import config from './config.js'
import { sleep } from './sleep.js'

const producerStream = createReadStream(config.FILE_PATH).pipe(parse())

for await (const record of producerStream) {
  await sleep(1)
  console.log(record)
}
