import { gzip } from 'zlib'
import { promisify } from 'util'
import fs from 'fs/promises'
const gzipP = promisify(gzip)

const filepath = process.argv[2]

fs.readFile(filepath)
  .then(file => gzipP(file))
  .then(zip => fs.writeFile(`${filepath}.zip`, zip))

/*
node:internal/errors:490
    ErrorCaptureStackTrace(err);
    ^

RangeError [ERR_FS_FILE_TOO_LARGE]: File size (13827821465) is greater than 2 GiB
    at new NodeError (node:internal/errors:399:5)
    at readFileHandle (node:internal/fs/promises:449:11) {
  code: 'ERR_FS_FILE_TOO_LARGE'
}

Node.js v18.16.0
*/
