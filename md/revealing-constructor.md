# Revealing Constructor: Table Of Contents

- [Revealing Constructor: Table Of Contents](#revealing-constructor-table-of-contents)
  - [Usage](#usage)

## Usage

"reveal" some private functionality of an object only at the moment of the
object's creation

[Origin](https://blog.domenic.me/the-revealing-constructor-pattern/)

```js
//
class Immutable {
  constructor(s,ex) {
    const buf = Buffer.alloc(s)
    const o = {}
    // attach props to expose at creation to "o"
    // attach props to expose always to "this"
    ex(o)
  }
}
```
