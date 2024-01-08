import { parse } from 'csv-parse'
import { createReadStream } from 'fs'
import config from './config.js'
import { PassThrough, Transform } from 'stream'
import { createGunzip } from 'zlib'

const filterItaly = new Transform({
  objectMode: true,

  transform(line, encoding, cb) {
    const [, country, profit] = line
    if (country === 'Italy') this.push(profit)
    cb()
  },
})

const sumProfit = new Transform({
  objectMode: true,

  transform(_profit, encoding, cb) {
    profit += +_profit
    cb()
  },

  flush(cb) {
    this.push()
    cb()
  },
})

let bytes = 0
const monitor = new PassThrough()
monitor.on('data', chunk => (bytes += chunk.length))
monitor.on('finish', () => console.log(`${bytes} bytes`))
// monitor.write('Hello!')
// monitor.end()

let profit = 0

createReadStream(config.FILE_PATH)
  .pipe(createGunzip())
  .pipe(monitor)
  .pipe(parse())
  .pipe(filterItaly)
  .pipe(sumProfit)
  .on('finish', () => console.log(profit))
