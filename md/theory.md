# Theory

## Table Of Contents

- [Theory](#theory)
  - [Table Of Contents](#table-of-contents)
  - [ESM Vs CJS](#esm-vs-cjs)
  - [Removing Event Listeners](#removing-event-listeners)

## ESM Vs CJS

- Extensions are required in ESM.
- ESM runs in strict mode & can't be disabled.

- Missing references in ESM.

  ```js
  console.log(exports); // ReferenceError: exports is not defined
  console.log(module); // ReferenceError: module is not defined
  console.log(__filename); // ReferenceError: __filename is not defined
  console.log(__dirname); // ReferenceError: __dirname is not defined
  ```

  Alternatives:

  - filename

    ```js
    import { fileURLToPath } from "url";
    const __filename = fileURLToPath(import.meta.url);

    console.log(import.meta.url); // file://<path-from-root>
    console.log(__filename); // <path-from-root>
    ```

  - dirname

    ```js
    import { fileURLToPath } from "url";
    import { dirname } from "path";

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    ```

  - Recreate `require()`

    ```js
    import { createRequire } from "module";
    const require = createRequire(import.meta.url); // create for current file
    ```

- this

  ```js
  // this.js - ESM
  console.log(this); // undefined

  // this.cjs – CommonJS
  console.log(this === exports) // true
  ```

- Import CJS **Default** (only) exports using EJS import syntax.

  This won't work.

  ```js
  // m1.cjs
  module.exports = {
    name: "qunari",
    story: "battleaxe",
  };

  // test.mjs
  import { name, story } from "./m1.cjs"; // Error
  ```

  Error:

  ```console
  import { name, story } from "./m1.cjs";
         ^^^^
  SyntaxError: Named export 'name' not found. The requested module './m1.cjs' is a CommonJS module, which may not support all module.exports as named exports.
  CommonJS modules can always be imported via the default export, for example using:

  import pkg from './m1.cjs';
  const { name, story } = pkg;
  ```

  This will work.

  ```js
  // main.js
  import pkg from "./m1.cjs";
  const { name, story } = pkg;
  ```

  And this will also work.

  ```js
  // m1.cjs
  module.exports = "qunari";

  // main.js
  import name from "./m1.cjs";
  ```

- ESM can't import JSON files directly as modules.

  ```js
  import './data.json'; // TypeError: needs an import assertion of type "json"
  ```

  Alternative:

  ```js
  import { createRequire } from "module";
  const require = createRequire(import.meta.url);
  const data = require("./data.json");
  ```

## Removing Event Listeners

```js
import { EventEmitter } from 'events'

const emy = new EventEmitter()

/* Register Events */

const bladeDanceCallback1 = event =>
  console.log(`Emy used blade-dance-1: ${event}`)

const bladeDanceCallback2 = event =>
  console.log(`Emy used blade-dance-2: ${event}`)

const bladeDanceCallback3 = event =>
  console.log(`Emy used blade-dance-3: ${event}`)

// 1--
emy.on('blade-dance', bladeDanceCallback1)
emy.on('rising-phoenix', event =>
  console.log(`Emy raised with rising-phoenix: ${event}`),
)
emy.on('dragon-descent', event =>
  console.log(`Emy descended with dragon-descent: ${event}`),
)

// 2--
emy.on('blade-dance', bladeDanceCallback2)
emy.on('rising-phoenix', event =>
  console.log(`Emy raised with rising-phoenix: ${event}`),
)
emy.on('dragon-descent', event =>
  console.log(`Emy descended with dragon-descent: ${event}`),
)

// 3--
emy.on('blade-dance', bladeDanceCallback3)
emy.on('rising-phoenix', event =>
  console.log(`Emy raised with rising-phoenix: ${event}`),
)
emy.on('dragon-descent', event =>
  console.log(`Emy descended with dragon-descent: ${event}`),
)

/* Emit Events */
emy.emit('blade-dance', 'Slicing through like a thunderbird !')
emy.emit('rising-phoenix', 'Reaching the Sun in 3... 2... 1...')
emy.emit('dragon-descent', 'Dark energized Red Dragon at machSpeed')

/* Remove Event Listeners */

console.log(emy.eventNames())

// Remove all Listeners of Every Type
// emy.eventNames().forEach(event => emy.removeAllListeners(event))

// Remove all Listeners of 1 Type
// emy.removeAllListeners('blade-dance') /* Won't print anymore... */

/**
 *  Remove 1 Listener of 1 Type
 *  Requires BOTH the event-name & its associated callback.
 */
emy.removeListener('blade-dance', event =>
  console.log(`Emy used blade-dance: ${event}`),
) // Doesn't work

emy.removeListener('blade-dance', bladeDanceCallback2)
// Removes the 2nd blade-dance event listener. Prints twice in total.

emy.removeListener('blade-dance', bladeDanceCallback1)
// Removes the 1st blade-dance event listener. Prints one time in total.

emy.removeListener('blade-dance', bladeDanceCallback3)
// Removes the 3rd blade-dance event listener. Nothing to print now... all gone.

console.log(emy.eventNames())

/* Emit Events */
emy.emit('blade-dance', 'Slicing through like a thunderbird !')
emy.emit('rising-phoenix', 'Reaching the Sun in 3... 2... 1...')
emy.emit('dragon-descent', 'Dark energized Red Dragon at machSpeed')
```
