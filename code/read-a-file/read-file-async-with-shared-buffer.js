/*
-- read-with-shared-buffer --

bytes: 13 GB
{
  rss: '141 MB',
  heapTotal: '7 MB',
  heapUsed: '5 MB',
  external: '101 MB',
  arrayBuffers: '101 MB'
}

NOTE:

TLDR: readableStream reads more data than required, so that the consumer never
has to wait.

The "readableStream" takes up more memory because it reads more data than the
buffer size (lookahead) so that the consumer doesn't have to wait for the next
chunk to be read.
The flow SHOULD BE something like this:
- readableStream reads some data
- emits 'readable'
- keep on reading more data than the buffer size so that the consumer doesn't
have to wait.

With the approach used here, the memory consumption sure is more, but it is
because there is no lookahead, which means, that the reading only happens when
the consumer signals it, and the consumer has to wait for the reading to
complete, during which it just sits idle.
The flow SHOULD BE something like this:
- fs read some data
- consumer consumes it
- consumer asks fs to read more
- fs reads more data
- consumer consumes it
... and so on.
*/

import { stat } from 'fs/promises'
import { openP, closeP, readP } from './promises.js'
import { printMemoryUsage } from './print.js'
import config from '../read-a-csv/config.js'

const SHARED_BUFFER_SIZE = 1

const SHARED_BUFFER = Buffer.alloc(SHARED_BUFFER_SIZE)
const FILE_STATS = await stat(config.FILE_PATH)
const FD = await openP(config.FILE_PATH)

let TOTAL_BYTES_READ = 0

const readBytesFromFile = () =>
  readP(FD, SHARED_BUFFER, 0, SHARED_BUFFER.length, TOTAL_BYTES_READ)

async function* generateChunks() {
  for (
    let i = 1;
    i <= Math.ceil(FILE_STATS.size / SHARED_BUFFER_SIZE);
    i += 1
  ) {
    const { bytesRead } = await readBytesFromFile()

    TOTAL_BYTES_READ += bytesRead
    yield SHARED_BUFFER.subarray(0, bytesRead)
  }

  await closeP(FD)
}

const processFile = async filePath => {
  for await (const chunk of generateChunks(filePath)) {
  }
}

console.time('read')
await processFile()
console.timeEnd('read')

console.log('TOTAL_BYTES_READ:', TOTAL_BYTES_READ)
printMemoryUsage()
