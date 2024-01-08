# Conceptual Patterns

## Table Of Contents

- [Conceptual Patterns](#conceptual-patterns)
  - [Table Of Contents](#table-of-contents)
  - [A Homemade Module Loader](#a-homemade-module-loader)
    - [`module.exports` versus `exports`](#moduleexports-versus-exports)
  - [The Continuation Passing Style (CPS)](#the-continuation-passing-style-cps)
    - [Synchronous CPS](#synchronous-cps)
    - [Asynchronous CPS](#asynchronous-cps)

## A Homemade Module Loader

A Function that loads a Module.

```js
const loadModule = (filename, module, require) => {
  const wrappedSrc = `(
    (module, exports, require) => ${fs.readFileSync(filename, "utf-8")})
    )(module, module.exports, require)`;

  eval(wrappedSrc); // eval() will treat its argument as ".js" & execute it.
};
```

The caller `require` Function.

```js
const require = (moduleName) => {
  console.log(`Require invoked for module: ${moduleName}`);

  const filename = require.resolve(moduleName);
  let module = require.cache[filename];

  // Fetch Module from Cache
  if (module) {
    return module.exports;
  }

  // Cache Module
  module = {
    filename,
    exports: {},
  };

  require.cache[filename] = module;

  // Load the Module
  loadModule(filename, module, require);

  // Return exported variables
  return module.exports;
};

require.cache = {};

require.resolve = (moduleName) => {
  /* resolve a full module id from the moduleName */
}
```

Using our Module Loader.

```js
const dependency = require("./anotherModule");

// Do something using dependency.

function log() {
  console.log(`Well done ${dependency.username}`);
}

module.exports.run = () => {
  log();
};
```

### `module.exports` versus `exports`

`exports` is a reference to `module.exports`.

This works:

```js
exports.hello = () => {
  console.log('Hello')
}
```

and is equivalent to:

```js
module.exports.hello = () => {
  console.log('Hello')
}
```

But this **won't** work:

```js
exports = () => {
  console.log('Hello')
}
```

as it's just re-assigning `exports` variable.

The Correct code will be:

```js
module.exports = () => {
  console.log('Hello')
}
```

## The Continuation Passing Style (CPS)

This term is used in Function Programming.
It means that the *result* of a function is populated in its callback.

### Synchronous CPS

```js
function addCps(a, b, callback) {
  callback(a + b);
}

console.log("before");

addCps(1, 2, (result) => console.log(`Result: ${result}`));

console.log("after");
```

Output

```console
before
Result: 3
after
```

### Asynchronous CPS

```js
function additionAsync(a, b, callback) {
  setTimeout(() => callback(a + b), 100);
}

console.log("before");

additionAsync(1, 2, (result) => console.log(`Result: ${result}`));

console.log("after");
```

Output

```console
before
after
Result: 3
```
