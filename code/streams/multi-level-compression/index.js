const { createReadStream, createWriteStream, readFileSync } = require('fs')
const gunzip = require('./gunzip.js')
const { createGunzip } = require('zlib')

let file = readFileSync('./sarveshFirst.gz')
console.log(file.length)
file = file.slice(6)
console.log(file.length)

createReadStream('./sarveshFirst.gz')
  .pipe(createGunzip())
  .pipe(createWriteStream('./sarveshFirst'))
