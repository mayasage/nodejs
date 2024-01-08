# Writable: Table Of Contents

- [Writable: Table Of Contents](#writable-table-of-contents)
  - [Description](#description)
  - [How to Write ?](#how-to-write-)
    - [Functions Used](#functions-used)
    - [Example of Writing](#example-of-writing)
  - [Implementation](#implementation)
    - [Implementation (Class Extend)](#implementation-class-extend)
      - [Example Implementation CE](#example-implementation-ce)
    - [Implementation (Simplified Constructor)](#implementation-simplified-constructor)
      - [Example Implementation SC](#example-implementation-sc)
  - [Backpressure](#backpressure)
    - [Handling in Writable](#handling-in-writable)
      - [Example Backpressure Handling](#example-backpressure-handling)

## Description

Represents a data destination like FS, DB, socket, stderr, stdout.

## How to Write ?

### Functions Used

`writable.write(chunk, [encoding], [callback])`
`writable.end([chunk], [encoding], [callback])`

- `write` pushes data down
- `end` provides the final chunk (optional)

- [chunk] is optional in case of `end`

- [encoding] (optional) can be specified if chunk is a string (default 'utf-8'),
  and is ignored if chunk is a buffer.

- [callback] (optional) in `write` is called when the chunk is flushed, and in
  `end` is the same as registering a listener on the 'finish' event.

### Example of Writing

```js
import { createServer } from 'http'

const server = createServer((req, res) => {
  /**
   *  "res" is an instance of http.ServerResponse, and also a Writable stream.
   */
  // res.write(chunk)
  // res.end(chunk) when done
})
```

## Implementation

### Implementation (Class Extend)

- `extends Writable`
- Implement `_write()`

#### Example Implementation CE

```js
import { Writable } from 'stream'

export default class ToFileStream extends Writable {
  /**
   *  Other options:
   *  - highWaterMark (default 16KB)
   *
   *  - decodeStrings (default true, ignored in binary mode): convert string to
   *    binary buffer before passing it to "_write" method.
   */
  constructor(options) {
    super({ ...options, objectMode: true })
  }

  /**
   *  "encoding" only makes sense when we're in binary mode.
   *  Here we're not.
   */
  _write(chunk, encoding, cb) {
    // use chunk as you like
    // call cb() to end
  }
}
```

### Implementation (Simplified Constructor)

Use `new Readable({ <super_options>, write(chunk, encoding, cb) })`

#### Example Implementation SC

```js
import { Writable } from 'stream'

const toFileStream = new Writable({
  objectMode: true,
  write(chunk, encoding, cb) {
    // use chunk as you like
    // call cb() to end
  },
})
```

## Backpressure

When data is written faster than the stream can consume it.
The handling mechanism for this situation is called 'Backpressure'.

### Handling in Writable

- `writable.write()` will return false, when the internal buffer exceeds the
  `highWaterMark`. So, stop writing.

- When the buffer is emptied, `drain` event is emitted. So, resume writing.

#### Example Backpressure Handling

```js
import { createServer } from 'http'

const server = createServer((req, res) => {
  const generateMore = () => {
    while (true) {
      let chunk
      const backpressure = !res.write(chunk)
      if (backpressure) return res.once('drain', generateMore)
    }
    // res.end()
  }

  generateMore()
})
```
