# Transform: Table Of Contents

- [Transform: Table Of Contents](#transform-table-of-contents)
  - [Description](#description)
  - [Working](#working)
  - [Implementation](#implementation)
    - [Implementation (Class Extend)](#implementation-class-extend)
      - [Example Implementation CE](#example-implementation-ce)
    - [Implementation (Simplified Constructor)](#implementation-simplified-constructor)
      - [Example Implementation SC](#example-implementation-sc)

## Description

- It is a `Duplex` stream.
- Specifically designed to handle data transformations.
- `zlib.createGzip()` and `crypto.createCipheriv()` create `Transform` streams.

## Working

1. Receives chunk from `Writable`
2. Performs some transformation (`_transform()`)
3. Make transformed data available to `Readable`

Requires additional implementation of `_transform()` and `_flush()`.

## Implementation

### Implementation (Class Extend)

- `extends Transform`
- Implement `_transform(chunk, encoding, cb)` and push in internal buffer
  using `push(chunk)`

#### Example Implementation CE

```js
import { Transform } from 'stream'

export default class ReplaceStream extends Transform {
  constructor(search, replace, options) {
    super(options)
  }

  _transform(chunk, encoding, cb) {
    let transformedChunk
    this.push(transformedChunk)
    cb()
  }

  _flush(cb) {
    let remainingChunk
    this.push(remainingChunk)
    cb()
  }
}

// Usage

const replaceStream = new ReplaceStream(search, replace)
replaceStream.on('data', chunk => {})

replaceStream.write(chunk)
replaceStream.end()
```

### Implementation (Simplified Constructor)

Use `new Transform({ <super_options>, transform(), flush() })`

#### Example Implementation SC

```js
import { Transform } from 'stream'

const replaceStream = new Transform({
  encoding: 'utf-8',

  transform(chunk, encoding, cb) {
    let transformedChunk
    this.push(transformedChunk)
    cb()
  },

  flush(cb) {
    let remainingChunk
    this.push(remainingChunk)
    cb()
  },
})
```
