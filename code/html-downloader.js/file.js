import { mkdir, readFile, writeFile, access } from 'fs/promises'

const file = {
  read: filePath => readFile(filePath, { encoding: 'utf-8' }),
  write: (filePath, content) => writeFile(filePath, content),
  mkdir: filePath => mkdir(filePath, { recursive: true }),

  exist: filePath =>
    new Promise(resolve =>
      access(filePath)
        .then(() => resolve(true))
        .catch(() => resolve(false)),
    ),
}

export default file
