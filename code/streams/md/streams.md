# Streams

## Table of Contents

- [Streams](#streams)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)

## Description

Every stream is an implementation of 1 of these 4 base abstract classes
available in the `stream` core module:

- `Readable`: Represents a source of data
- `Writable`: Represents a data destination like FS, DB, socket, stderr, stdout

- `Duplex`: Describes an entity that is both a data source & a data destination,
  such as network sockets.

- `Transform`: It is a `Duplex` stream. Writable` on one side, `Readable` on the
  other.

- `PassThrough`: It is a `Transform` stream.

Every stream class is also an instance of `EventEmitter`.

- on 'end' -> Readable
- on 'finish' -> Writable
- on 'error'

Streams support 2 operating *modes*:

- **Binary Mode:** chunks (like buffers or strings)
- **Object Mode:** objects (almost any JS value)
