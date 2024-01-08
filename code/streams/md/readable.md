# Readable: Table Of Contents

- [Readable: Table Of Contents](#readable-table-of-contents)
  - [Description](#description)
  - [Ways of Reading](#ways-of-reading)
    - [Non-flowing mode](#non-flowing-mode)
      - [Usage NFM](#usage-nfm)
    - [Flowing mode](#flowing-mode)
      - [Usage FM](#usage-fm)
        - [Callback FM](#callback-fm)
        - [Async Iterator](#async-iterator)
  - [Implementation](#implementation)
    - [Implementation (Class Extend)](#implementation-class-extend)
      - [Example Implementation CE](#example-implementation-ce)
    - [Implementation (Simplified Constructor)](#implementation-simplified-constructor)
      - [Example Implementation SC](#example-implementation-sc)
  - [Use Cases](#use-cases)
    - [Readable streams from Iterables](#readable-streams-from-iterables)
      - [Readable.from(): Small Iterable](#readablefrom-small-iterable)
        - [Example Small Iterable](#example-small-iterable)
      - [Iterable.values() + new Readable(): Big Iterable](#iterablevalues--new-readable-big-iterable)
        - [Example Big Iterable](#example-big-iterable)
  - [Backpressure](#backpressure)
    - [Handling in Readable](#handling-in-readable)
      - [Example Backpressure Handling](#example-backpressure-handling)

## Description

Represents a source of data

## Ways of Reading

- non-flowing (or paused)
- flowing

### Non-flowing mode

- Default
- Attach a listener to the stream for `readable` event or invoke the `pause()`
  method
- Data is pulled using `read()`

#### Usage NFM

```js
process.stdin.on('readable', () => {
  let chunk
  while ((chunk = process.stdin.read()) !== null) {}
})
```

### Flowing mode

- Attach a listener to the `data` event or invoke the `resume()` method.
- Data is automatically pushed to the listener as soon as it arrives
- Less flexible

#### Usage FM

##### Callback FM

```js
process.stdin
  .setEncoding('utf-8') // on Readable Interface
  .on('data', chunk => {})
```

##### Async Iterator

```js
(async () => {
  for await (let chunk of process.stdin) {
  }
})()
```

## Implementation

### Implementation (Class Extend)

1. `extends Readable`
2. Implement `_read(size)` to push data in internal buffer using `push(chunk)`

#### Example Implementation CE

```js
import { Readable } from 'stream'

export class RandomStream extends Readable {
  /**
   *  Possible Options Parameters
   *  - encoding (default null) - used to convert Buffer
   *  - objectMode (default false)
   *  - highWaterMark (default 16KB) - internal buffer size
   */
  constructor(options) {
    super(options)
  }

  _read(size) {
    // this.push(chunk)
    // this.push(null) when done
  }
}
```

### Implementation (Simplified Constructor)

Use `new Readable({ <super_options>, read(size) })`

#### Example Implementation SC

```js
import { Readable } from 'stream'

const randomStream = new Readable({
  /**
   *  "read" (here) === "_read" (when class extend is used)
   *  "push" is same
   *  This is just a convenience feature.
   */
  read(size) {
    // this.push(chunk)
    // this.push(null) when done
  },
})
```

## Use Cases

### Readable streams from Iterables

Iterables mean generators, iterators, and async iterators.

#### Readable.from(): Small Iterable

- `Readable.from(iterable, {options})`
- `objectMode` is `true` by default

##### Example Small Iterable

```js
import { Readable } from 'stream'

const mountains = [{ name: 'Everest', height: 8848 }]
const mountainsStream = Readable.from(mountains, { objectMode: true })
```

#### Iterable.values() + new Readable(): Big Iterable

Use iterator returned by `Iterable.values` in `new Readable()`.

##### Example Big Iterable

```js
import { Readable } from 'stream'

const mountains = [{ name: 'Everest', height: 8848 }]

const mountainIterator = mountains.values()

const mountainsStream = new Readable({
  read() {
    const { done, value } = mountainIterator.next()
    this.push(done ? null : value)
  },
  objectMode: true,
})

/**
 *  "mountains.values()" is functionally same as "mountains[Symbol.iterator]()"
 *  But, "mountains.values() === mountains[Symbol.iterator]()" will be FALSE
 *  because, "mountains.values()" will always return a NEW iterator
 *  This means that even "mountains.values() === mountains.values()" is FALSE
 */
```

## Backpressure

When data is written faster than the stream can consume it.
The handling mechanism for this situation is called 'Backpressure'.

### Handling in Readable

- The `push()` method invoked inside the `_read()` method will return FALSE,
  when the internal buffer exceeds the `highWaterMark`. So, stop writing.

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
