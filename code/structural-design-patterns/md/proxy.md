# Proxy: Table Of Contents

- [Proxy: Table Of Contents](#proxy-table-of-contents)
  - [Usage](#usage)

## Usage

```js
const evenNumber = new Proxy([], {
  has: (tgt, num) => num % 2 === 0,
  get: (tgt, indx) => indx * 2,
})

console.log(2 in evenNumber) // true
console.log(5 in evenNumber) // false
console.log(evenNumber[7])
```
