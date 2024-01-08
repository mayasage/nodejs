import { randomBytes } from 'crypto'

const promisify =
  callbackFn =>
  (...args) =>
    new Promise((resolve, reject) =>
      callbackFn(...args, (error, success) =>
        error ? reject(error) : resolve(success),
      ),
    )

const randomBytesP = promisify(randomBytes)

randomBytesP(32).then(buffer => console.log(buffer.toString()))
