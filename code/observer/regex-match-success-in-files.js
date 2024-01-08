/**
 * Notify subscribers in real time when a particular regular expression is
 * matched in a list of files.
 *
 * Important Note on the special 'error' event.
 * If you don't handle the 'error' event, then EventEmitter will end your App.
 */

import { EventEmitter } from 'events'
import { readFile } from 'fs'

class FindRegex extends EventEmitter {
  constructor(regex) {
    super()
    this.regex = regex
    this.files = []
  }

  addFile(file) {
    this.files.push(file)
    return this
  }

  find() {
    for (const file of this.files) {
      readFile(file, 'utf-8', (err, data) => {
        if (err) {
          return this.emit('error', err, file)
        }

        this.emit('fileread', file)

        // Match Regex
        const match = data.match(this.regex)
        if (match) {
          match.forEach(m => this.emit('match', m, file))
        }
      })
    }

    return this
  }
}

/**
 * If you comment out the 'error' event handler, the App will die.
 */
new FindRegex(/Hello/)
  .addFile('./a.txt')
  .addFile('./b.txt')
  .addFile('./c.txt')
  .addFile('./d.txt')
  .find()
  .on('error', (err, file) => console.log(`[Error] ${err} in FILE ${file}`))
  .on('fileread', file => console.log(`[Read file] "${file}"`))
  .on('match', (match, file) =>
    console.log(`[Match] "${match}" in FILE ${file}`),
  )
