# Explanation

## Table Of Contents

- [Explanation](#explanation)
  - [Table Of Contents](#table-of-contents)
  - [`require` `A` -\> `B`](#require-a---b)
  - [`require` `B` -\> `A`](#require-b---a)

## `require` `A` -> `B`

`require` `a.js` before `b.js`.

```console
a -> {
  "b": {
    "a": {
      "loaded": false
    },
    "loaded": true
  },
  "loaded": true
}
b -> {
  "a": {
    "loaded": false
  },
  "loaded": true
}
```

Steps

1. `a` = `{ loaded: false }`
2. `require b`
3. `b` = `{ loaded: false }`
4. `require a`
5. `cached a` = 1.
6. `final b` = `{ a: { loaded: false }, loaded: true }`
7. `final a` = `{ b: { final b }, loaded: true }`

## `require` `B` -> `A`

`require` `b.js` before `a.js`.

```console
a -> {
  "b": {
    "loaded": false
  },
  "loaded": true
}
b -> {
  "a": {
    "b": {
      "loaded": false
    },
    "loaded": true
  },
  "loaded": true
}
```

Steps

1. `b` = `{ loaded: false }`
2. `require a`
3. `a` = `{ loaded: false }`
4. `require b`
5. `cached b` = 1.
6. `final a` = `{ b: { loaded: false }, loaded: true }`
7. `final b` = `{ a: { final a }, loaded: true }`
