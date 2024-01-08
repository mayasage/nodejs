import workerpool from 'workerpool'

const pool = workerpool.pool()

const add = (a, b) => a + b

const sH = res => console.log(`res: ${res}`)
const eH = e => console.error(`error: ${e}`)
const k = () => pool.terminate() // destroy the pool

pool.exec(add, [2, 3]).then(sH).catch(eH).then(k)
