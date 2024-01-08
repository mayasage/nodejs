import { createReadStream } from 'fs'
import config from '../config.js'
import { sleep } from '../sleep.js'
import co from 'co'

const readStream = createReadStream(config.FILE_PATH, {
  highWaterMark: 1024,
  encoding: 'utf-8',
})

let ended = false
let chunk

function* generator() {
  const onEndP = new Promise((resolve, reject) => {
    readStream.once('error', () => reject)
    readStream.once('end', () => (ended = true) && resolve())
  })

  while (!ended) {
    yield (chunk = readStream.read()) === null
      ? Promise.race([
          onEndP,
          new Promise(resolve =>
            readStream.once('readable', () =>
              (chunk = readStream.read()) !== null ? resolve(chunk) : '',
            ),
          ),
        ])
      : chunk
  }
}

/* Alternative - 1 */
// for await (const chunk of generator()) {
//   await sleep(1)
//   console.log(chunk)
// }
/* --- */

/* Alternative - 2 */
// Can't make this async
function* consumer() {
  for (const charP of generator()) {
    yield charP.then(char => char && console.log(char))
  }
}

co(consumer).catch(err => console.log(err))
/* --- */
