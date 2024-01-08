import wp from 'workerpool'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const sH = res => console.log(`res: ${res}`)
const eH = e => console.error(`error: ${e}`)

const lp = wp.pool(join(__dirname, './light.js'))
lp.exec('l', [2, 3])
  .then(sH)
  .catch(eH)
  .then(() => lp.terminate()) // destroy the pool

/*
// error: Error: Unknown method "add"
lp.exec('h', [2, 3]).then(sH).catch(eH)
.then(() => dp.terminate()) // destroy the pool
*/

const hp = wp.pool(join(__dirname, './heavy.js'))
hp.exec('h', [2, 3])
  .then(sH)
  .catch(eH)
  .then(() => hp.terminate()) // destroy the pool

/*
// error: Error: Unknown method "mul"
hp.exec('l', [2, 3]).then(sH).catch(eH)
.then(() => dp.terminate()) // destroy the pool
*/

const fp = wp.pool()

const add = (a, b) => a + b
fp.exec(add, [3, 6])
  .then(sH)
  .catch(eH)
  .then(() => fp.terminate()) // destroy the pool
