import { Level } from 'level'
import { createFSAdapter } from './fs-adapter.js'

const db = new Level('db', { valueEncoding: 'binary' })
const fs = createFSAdapter(db)

fs.writeFile('file.txt', 'Hello!', () => {
  fs.readFile('file.txt', { encoding: 'utf8' }, (err, res) => {
    if (err) {
      return console.error(err)
    }
    console.log(res)
  })
})

// try to read a missing file
fs.readFile('missing.txt', { encoding: 'utf8' }, (err, res) => {
  console.error(err)
})
