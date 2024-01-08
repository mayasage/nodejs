import fs from 'fs'
import path from 'path'

// Manages how html is stored in a file.
export default class FileManager {
  static makeDirForFile(filePath, cb) {
    const dirname = path.dirname(filePath)

    fs.mkdir(dirname, { recursive: true }, err =>
      err ? (err.dirname = dirname && cb(err)) : cb(null),
    )
  }

  static writeFile(filePath, content, cb) {
    fs.writeFile(filePath, content, err =>
      err ? (err.filePath = filePath && cb(err)) : cb(null),
    )
  }

  static readFile(filePath, cb) {
    fs.readFile(filePath, cb)
  }
}
