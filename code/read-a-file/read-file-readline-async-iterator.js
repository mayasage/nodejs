import readline from 'readline'
import { createReadStream } from 'fs'
import { sleep } from './sleep.js'
import config from './config.js'

const rl = readline.createInterface({
  input: createReadStream(config.FILE_PATH, { encoding: 'utf-8' }),
  crlfDelay: Infinity,
})

for await (const line of rl) {
  console.log(line)
  await sleep(1)
}
