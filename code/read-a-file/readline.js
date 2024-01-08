/*
--- readline ---
13GB = Too slow (if it ever completes)
*/

import { createReadStream } from 'fs'
import readline from 'readline'
import { printMemoryUsage } from './print.js'
import events from 'events'
import config from './config.js'

let TOTAL_BYTES_READ = 0

const lineReader = readline.createInterface({
  input: createReadStream(config.FILE_PATH, { highWaterMark: 1024 }),
  crlfDelay: Infinity,
})

console.time('read')

/* Alternative -1 */
// for await (const line of lineReader) {
//   TOTAL_BYTES_READ += line.length
// }
/* --- */

/* Alternative - 2 */
// lineReader.on('line', line => (TOTAL_BYTES_READ += line.length))
// await events.once(lineReader, 'close')
/* --- */

console.timeEnd('read')

console.log('TOTAL_BYTES_READ:', TOTAL_BYTES_READ)
printMemoryUsage()
