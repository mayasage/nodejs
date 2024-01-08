# Promises

## Table Of Contents

- [Promises](#promises)
  - [Table Of Contents](#table-of-contents)
  - [Catch](#catch)
  - [Static Methods](#static-methods)
    - [Promise.resolve()](#promiseresolve)
    - [Promise.reject()](#promisereject)
    - [Promise.allSettled()](#promiseallsettled)

## Catch

`.catch()` is a syntactic sugar for `.then(undefined, error)`

## Static Methods

### Promise.resolve()

Returns a Promise.

```js
Promise.resolve(10).then(res => console.log(res))
console.log(50)
```

Output:

```console
50
10
```

### Promise.reject()

Returns a Promise.

```js
Promise.reject(10).catch(error => console.log(error))
console.log(50)
```

Output:

```console
50
10
```

### Promise.allSettled()

```js
Promise.allSettled([Promise.resolve(10), Promise.reject(30)]).then(res =>
  console.log(res),
)
```

Output:

```console
[
  { status: 'fulfilled', value: 10 },
  { status: 'rejected', reason: 30 }
]
```
