import { describe, test, expect } from '@jest/globals'
import FileManager from './FileManager.js'
import fs from 'fs'

import url from 'url'
import path from 'path'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const writeFile = () => {
  const filePath = path.join(__dirname, '../data/', 'writeFile.txt')
  const content = 'Telulah incoming... Too hot to handle !'
  FileManager.writeFile(filePath, content, err => {
    expect(err === undefined || err === null).toBe(true)
    expect(fs.readFileSync(filePath)).toBe(content)
  })
}

describe('FileManager', () => {
  test('writeFile', writeFile)
  // test('createDir', createDirectory)
})
