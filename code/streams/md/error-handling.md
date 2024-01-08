# Error Handling: Table Of Contents

## Problem

```js
stream1
  .on('error', () => {})
  .pipe(stream2)
  .on('error', () => {})
```

Here, the failing stream is not properly destroyed, which might leave dangling
resources (for example, file descriptors, connections, and so on) and leak
memory.

## A Simple, Inelegant Solution

```js
function handleError (err) {
  console.error(err)
  stream1.destroy()
  stream2.destroy()
}

stream1
  .on('error', handleError)
  .pipe(stream2)
  .on('error', handleError)
```

## Pipeline()
