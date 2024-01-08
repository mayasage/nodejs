/*
-- createReadStream --

totalBytesRead: 13 GB
high water mark size: 100 MB
time taken: 14.979s
{
  rss: '317.25390625 MB',
  heapTotal: '6.09375 MB',
  heapUsed: '4.532958984375 MB',
  external: '387.6508674621582 MB',
  arrayBuffers: '387.2541341781616 MB'
}

totalBytesRead: 13 GB
high water mark size: 50 MB
time taken: 17.495s
{
  rss: '107.421875 MB',
  heapTotal: '7.34375 MB',
  heapUsed: '4.626335144042969 MB',
  external: '187.6508674621582 MB',
  arrayBuffers: '137.25413417816162 MB'
}

totalBytesRead: 13 GB
high water mark size: 10 MB
time taken: 12.319s
{
  rss: '129.203125 MB',
  heapTotal: '6.59375 MB',
  heapUsed: '4.706489562988281 MB',
  external: '67.6508674621582 MB',
  arrayBuffers: '67.25413417816162 MB'
}

totalBytesRead: 13 GB
high water mark size: 1 MB
time taken: 9.943s
{
  rss: '83.921875 MB',
  heapTotal: '7.59375 MB',
  heapUsed: '5.326164245605469 MB',
  external: '34.65246295928955 MB',
  arrayBuffers: '2.0167903900146484 MB'
}

totalBytesRead: 13 GB
high water mark size: 1 KB
time taken: TOO LONG

totalBytesRead: 13 GB
high water mark size: 16 KB
time taken: 23.527s
{
  rss: '63.296875 MB',
  heapTotal: '9.59375 MB',
  heapUsed: '5.323432922363281 MB',
  external: '0.8712129592895508 MB',
  arrayBuffers: '0.4737234115600586 MB'
}
*/

import { createReadStream } from 'fs'
import { printMemoryUsage } from './print.js'

const LARGE_FILE_PATH = '/home/kratikal/one/course.zip'
const SMALL_FILE_PATH = './data.txt'
const FILE = LARGE_FILE_PATH
const HIGH_WATER_MARK_SIZE = 1024 * 16

const READSTREAM = createReadStream(FILE, {
  highWaterMark: HIGH_WATER_MARK_SIZE,
})

let TOTAL_BYTES_READ = 0

console.time('fileread')

for await (const chunk of READSTREAM) {
  TOTAL_BYTES_READ += chunk.length
}

console.timeEnd('fileread')
console.log('TOTAL_BYTES_READ:', TOTAL_BYTES_READ)
printMemoryUsage()
