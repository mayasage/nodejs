# Readable: Table Of Contents

- [Readable: Table Of Contents](#readable-table-of-contents)
  - [Description](#description)

## Description

- Implements Both `Readable` & `Writable`
-
- Describes an entity that is both a data source & a data destination, such as
  network sockets.

- Extra Options:
  - `allowHalfOpen` (default true) - if set to false, ends the stream if either
    `Readable` or `Writable` ends.

  - `readableObjectMode`
  - `writableObjectMode`

- In a simple Duplex Stream, there is no relationship between `Readable` and
  `Writable`. Example, TCP socket.
