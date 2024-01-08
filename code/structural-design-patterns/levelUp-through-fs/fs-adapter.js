import { resolve } from 'path'

export const createFSAdapter = db => ({
  readFile(file, opts, cb) {
    switch (typeof opts) {
      case 'function': {
        cb = opts
        opts = {}
        break
      }

      case 'string': {
        opts = { encoding: opts }
        break
      }
    }

    db.get(resolve(file), { valueEncoding: opts.encoding }, (err, val) => {
      if (err) {
        if (err.code === 'LEVEL_NOT_FOUND') {
          err = new Error(`ENOENT, open "${file}"`)
          err.code = 'ENOENT'
          err.errno = 34
          err.path = file
        }

        return cb && cb(err)
      }

      cb && cb(null, val)
    })
  },

  writeFile(file, data, opts, cb) {
    switch (typeof opts) {
      case 'function': {
        cb = opts
        opts = {}
        break
      }

      case 'string': {
        opts = { encoding: opts }
        break
      }
    }

    db.put(
      resolve(file),
      data,
      {
        valueEncoding: opts.encoding,
      },
      cb,
    )
  },
})
