import ToFileStream from './ToFileStream.js'

const toFileStream = new ToFileStream()

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
