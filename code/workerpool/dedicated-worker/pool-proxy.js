import workerpool from 'workerpool'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const pool = workerpool.pool(join(__dirname, './node.js'))

const sH = res => console.log(`res: ${res}`)
const eH = e => console.error(`error: ${e}`)
const k = () => pool.terminate() // destroy the pool

const proxy = await pool.proxy()
proxy.add(2, 3).then(sH).catch(eH).then(k)
