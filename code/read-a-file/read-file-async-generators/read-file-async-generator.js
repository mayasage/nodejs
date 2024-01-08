import { createReadStream } from 'fs'
import config from '../config.js'
import { sleep } from '../sleep.js'

const readStream = createReadStream(config.FILE_PATH, {
  highWaterMark: 1024,
  encoding: 'utf-8',
})

async function* generator() {
  let ended = false

  const onEndP = new Promise((resolve, reject) => {
    readStream.once('error', () => reject)
    readStream.once('end', () => (ended = true) && resolve())
  })

  while (!ended) {
    const chunk = readStream.read()

    if (chunk !== null) {
      await sleep(1)
      yield chunk
      continue
    }

    const onReadableP = new Promise(res => readStream.once('readable', res))
    await Promise.race([onEndP, onReadableP])
  }
}

/* Alternative - 1 */
for await (const chunk of generator()) {
  await sleep(2)
  console.log(chunk)
}
/* --- */
