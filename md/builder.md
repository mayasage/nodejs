# Builder: Table Of Contents

- [Builder: Table Of Contents](#builder-table-of-contents)
  - [Usage](#usage)
  - [Example](#example)
    - [Classes](#classes)
    - [Functions](#functions)

## Usage

Provides a very elegant solution to the problem of creating complex objects or
invoking complex functions.

## Example

### Classes

Always create a separate `Builder` class, because `{}` returned by `build()` is
GUARANTEED to be valid and in a consistent state.

Had you moved this logic inside the `Url` class, you could have invoked
`toString()` at any time (even when the states are not "ready").
Then you'll have to add checks to see if the state is valid.
Too much complexity.

```js
export class Url {
  constructor(params) {
    // 10,000 params
    this.validate()
  }
  validate() {}
  toString() {}
}

export class UrlBuilder {
  setProtocol(p) {}
  setAuthentication(u, p) {}
  build() {}
}
```

### Functions

```js
const fn = (p = {}) => {
  // 10,000 parameters
  console.log(p)
  return 1
}

const fnc = () => {
  const p = Object.create(null)

  p.color = c => {
    p._color = c
    return p
  }

  p.name = n => {
    p._name = n
    return p
  }

  p.invoke = () => {
    return fn({ color: p._color, name: p._name })
  }

  return p
}

const r1 = fnc().color('red').name('pataya').invoke()
const r2 = fnc().color('blue').invoke()

console.log(`r1: ${r1}`)
console.log(`r2: ${r2}`)
```
