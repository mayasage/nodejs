import { mkdir, writeFile } from 'fs/promises'
import { Writable } from 'stream'
import { dirname } from 'path'

const toFileStream = new Writable({
  objectMode: true,
  write(chunk, encoding, cb) {
    const { path, content } = chunk

    mkdir(dirname(path), { recursive: true })
      .then(() => writeFile(path, content))
      .then(cb)
      .catch(cb)
  },
})

toFileStream.write(
  {
    path: './data/file1.txt',
    content: 'Hello from File1 :)',
  },
  null,
  () => console.log('wrote'),
)

toFileStream.write(
  {
    path: './data/file2.txt',
    content: 'Hello from File2 :)',
  },
  null,
  () => console.log('wrote'),
)

toFileStream.end(() => console.log('All files created'))
