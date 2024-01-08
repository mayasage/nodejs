# The Factory Pattern: Table of Contents

- [The Factory Pattern: Table of Contents](#the-factory-pattern-table-of-contents)
  - [Why](#why)
  - [Decoupling object creation and implementation](#decoupling-object-creation-and-implementation)
  - [A mechanism to enforce encapsulation](#a-mechanism-to-enforce-encapsulation)
    - [Other Ways](#other-ways)
      - [Private Fields (#)](#private-fields-)
      - [WeakMaps](#weakmaps)
      - [Symbols](#symbols)
      - [Private Variable in Constructor (Best)](#private-variable-in-constructor-best)
      - [Using Conventions (Doesn't hide)](#using-conventions-doesnt-hide)

## Why

- decouple the creation of an Object from one particular implementation
- to create an object whose class is determined at runtime
- to enforce encapsulation by leveraging closures.

## Decoupling object creation and implementation

First and foremost, a `factory` allows us to separate the *creation* of an
object from its *implementation*.

Inside the factory:

- create a new instance of a class using the `new` operator, or
- leverage closures to dynamically build a stateful object literal

Example:

```js
const image = new Image(name)  // fixed
```

VS

```js
function createImage(name) {  // flexible
  if (name.match(/\.jpe?g$/)) {
    return new ImageJpeg(name)
  } else if (name.match(/\.gif$/)) {
    return new ImageGif(name)
  } else if (name.match(/\.png$/)) {
    return new ImagePng(name)
  } else {
    throw new Error('Unsupported format')
  }
}
```

## A mechanism to enforce encapsulation

In JavaScript, one of the main ways to enforce encapsulation is through function
scopes and closures.
A factory makes it straightforward to enforce private variables.

Example:

```js
function factory(name) {
  const pvt = {} // local var; can't be accessed from outside in any way

  const inst = {
    // will keep reference to the pvt obj residing in heap
    setName(name) {
      // makes error handling possible on setting property
      if (!name) throw new Error('A person must have a name')
      pvt.name = name
    },

    getName() {
      return pvt.name
    },
  }

  inst.setName(name)
  return inst
}
```

### Other Ways

#### Private Fields (#)

Introduced in Node.js 12.
[private-fields](https://github.com/tc39/proposal-class-fields#private-fields)

Most modern, but experimental and yet to be included in the official ECMAScript
specification.

#### WeakMaps

ECMAScript 6

[weakmap](https://fitzgeraldnick.com/2014/01/13/hiding-implementation-details-with-e6-weakmaps.html)

#### Symbols

ES6

[pvt-data-es6](https://2ality.com/2016/01/private-data-classes.html#using-symbols-as-keys-for-private-properties)

#### Private Variable in Constructor (Best)

This is the legacy but also the best-known approach.

[Douglas Crockford](https://www.crockford.com/javascript/private.html)

#### Using Conventions (Doesn't hide)

prefixing the name of a property with an underscore "_"
doesn't prevent a member from being read or modified from the outside.
