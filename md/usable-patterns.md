# Usable Patterns

## Table Of Contents

- [Usable Patterns](#usable-patterns)
  - [Table Of Contents](#table-of-contents)
  - [The Revealing Module Pattern](#the-revealing-module-pattern)
  - [Module Definition Patterns](#module-definition-patterns)
    - [CommonJS Specification + Node Extended](#commonjs-specification--node-extended)
      - [Named Exports](#named-exports)
      - [Exporting a Function](#exporting-a-function)
      - [Exporting a Class](#exporting-a-class)
      - [Exporting an Instance](#exporting-an-instance)
      - [Monkey Patching](#monkey-patching)
    - [ESM: ECMAScript modules](#esm-ecmascript-modules)
      - [Named Exports and Imports](#named-exports-and-imports)
      - [Default Exports and Imports](#default-exports-and-imports)
      - [Mixed Exports (Named + Default)](#mixed-exports-named--default)
      - [Async Imports](#async-imports)
  - [Observer Pattern](#observer-pattern)
    - [Combining Events with Callbacks](#combining-events-with-callbacks)
  - [Asynchronous CPS](#asynchronous-cps)
    - [Executing Tasks in a Sequence](#executing-tasks-in-a-sequence)
    - [The Sequential Iterator pattern](#the-sequential-iterator-pattern)
    - [The Unlimited Parallel Execution pattern](#the-unlimited-parallel-execution-pattern)
  - [Promises](#promises)
    - [Sequential Iteration with Promises](#sequential-iteration-with-promises)
    - [Unlimited Parallel Execution](#unlimited-parallel-execution)
    - [Limited Parallel Execution](#limited-parallel-execution)
      - [Async Map with difference Concurrencies](#async-map-with-difference-concurrencies)
      - [Run Async task with concurrency](#run-async-task-with-concurrency)
  - [Streams](#streams)
    - [Client-Server Encryption](#client-server-encryption)

## The Revealing Module Pattern

- Prevents global namespace pollution in Browsers.
- This is also referred to as **Immediately Invoked Function Expression (IIFE)**.

```js
const myModule = (() => {
  const privateFoo = () => {};
  const privateBar = [];

  const exported = {
    publicFoo: () => {},
    publicBar: () => {},
  };

  return exported;
})();

console.log(myModule); // exported
console.log(myModule.privateFoo, myModule.privateBar); // undefined
```

## Module Definition Patterns

### CommonJS Specification + Node Extended

#### Named Exports

Export

```js
// file logger.js
exports.info = (message) => {
  console.log(`info: ${message}`);
};

exports.verbose = (message) => {
  console.log(`verbose: ${message}`);
};
```

Usage

```js
// file main.js
const logger = require("./logger");

logger.info("This is an informational message");
logger.verbose("This is a verbose message");
```

Note

- This is the **ONLY** way compatible with the CommonJS specifications.

#### Exporting a Function

Also called **substack pattern** after one of its most prolific adopters,
*James Halliday* (nickname *substack* – <https://github.com/substack>)

Export

```js
// file logger.js
module.exports = (message) => {
  console.log(`info: ${message}`);
};

module.exports.verbose = (message) => {
  console.log(`verbose: ${message}`);
};
```

Usage

```js
// file main.js
const logger = require("./logger");

logger("This is an informational message");
logger.verbose("This is a verbose message");
```

#### Exporting a Class

```js
class Logger {
  constructor(name) {
    this.name = name;
  }

  log(message) {
    console.log(`[${this.name}] ${message}`);
  }

  info(message) {
    this.log(`info: ${message}`);
  }

  verbose(message) {
    this.log(`verbose: ${message}`);
  }
}

module.exports = Logger;
```

Usage

```js
// file main.js
const Logger = require("./logger");
const dbLogger = new Logger("DB");

dbLogger.info("This is an informational message");

const accessLogger = new Logger("ACCESS");

accessLogger.verbose("This is a verbose message");
```

#### Exporting an Instance

Export

```js
// file logger.js
class Logger {
  constructor(name) {
    this.count = 0;
    this.name = name;
  }
  log(message) {
    this.count++;
    console.log("[" + this.name + "] " + message);
  }
}

module.exports = new Logger("DEFAULT");
```

Usage

```js
// main.js
const logger = require("./logger");

logger.log("This is an informational message");

// Make customLogger using the Instance. (Avoid !!)
const customLogger = new logger.constructor("CUSTOM");
customLogger.log("This is an informational message");
```

Note:

- This is LIKE **singleton**, but it doesn't guarantee uniqueness across App.
  - Because, the module may be installed multiple times inside Dependency Tree.

#### Monkey Patching

Generally refers to the practice of modifying objects at runtime to change or
extend their behavior, or to apply temporary fixes.

Export

```js
// file patcher.js

// ./logger is another module
require("./logger").customMessage = function () {
  console.log("This is a new functionality");
};
```

Usage

```js
// file main.js
require("./patcher");

const logger = require("./logger");

logger.customMessage();
```

Note:

- **Avoid**

### ESM: ECMAScript modules

#### Named Exports and Imports

Export

```js
// logger.js

// exports a function as `log`
export const log = (msg) => console.log(msg);

// exports a constant as `DEFAULT_LEVEL`
export const DEFAULT_LEVEL = "info";

// exports an object as `LEVELS`
export const LEVELS = {
  error: 0,
  debug: 1,
  warn: 2,
  data: 3,
  info: 4,
  verbose: 5,
};

// exports a class as `Logger`
export class Logger {
  constructor(name) {
    this.name = name;
  }

  log(msg) {
    console.log(`[${this.name}] ${msg}`);
  }
}
```

Import Entire Module

```js
// The * is also called "namespace import".
import * as loggerModule from "./logger.js";
console.log(loggerModule);
```

Import a few entities

```js
import { log, Logger } from "./logger.js";

log("Hello World");

const logger = new Logger("DEFAULT");

logger.log("Hello world");
```

Avoid Name Clashes

```js
import { log as log2 } from "./logger.js";

const log = console.log;

log("message from log");
log2("message from log2");
```

#### Default Exports and Imports

Export

```js
// logger.js

export default class Logger {
  constructor(name) {
    this.name = name;
  }

  log(message) {
    console.log(`[${this.name}] ${message}`);
  }
}
```

Import

```js
import MyLogger from "./logger.js";

const logger = new MyLogger("info");

logger.log("Hello World");
```

Import with a different name

```js
// showDefault.js

// import { default } from './logger.js'; // default is a reserved word
import * as loggerModule from "./logger.js";

console.log(loggerModule);
console.log(loggerModule.default); // [class Logger]
```

#### Mixed Exports (Named + Default)

Export

```js
// logger.js

export default (msg) => console.log(message);

export const info = (msg) => log(`info: ${message}`);
```

Import

```js
import * as logger from "./logger.js";
import logger2, { info } from "./logger.js"; // also works

console.log("* = ", logger);
// * =  [Module: null prototype] {
//   default: [Function: default],
//   info: [Function: info]
// }

console.log(`info = ${info}`); // info = (msg) => log(`info: ${message}`)
console.log(`default = ${logger2}`); // default = (msg) => console.log(message)

console.log(info === logger.info); // true
console.log(logger.default === logger2); // true
```

#### Async Imports

Export

```js
// strings-el.js
export const HELLO = 'Γεια σου κόσμε';

// strings-en.js
export const HELLO = 'Hello World';

// strings-es.js
export const HELLO = 'Hola mundo';

// strings-it.js
export const HELLO = 'Ciao mondo';

// strings-pl.js
export const HELLO = 'Witaj świecie';
```

Import

```js
const SUPPORTED_LANGUAGES = ["el", "en", "es", "it", "pl"];

const selectedLanguage = process.argv[2];

if (!SUPPORTED_LANGUAGES.includes(selectedLanguage)) {
  console.error("The specified language is not supported");
  process.exit(1);
}

const translationModule = `./strings-${selectedLanguage}.js`;
import(translationModule).then((strings) => console.log(strings.HELLO));
```

## Observer Pattern

```js
/**
 * Notify subscribers in real time when a particular regular expression is
 * matched in a list of files.
 *
 * Important Note on the special 'error' event.
 * If you don't handle the 'error' event, then EventEmitter will end your App.
 */

import { EventEmitter } from 'events'
import { readFile } from 'fs'

class FindRegex extends EventEmitter {
  constructor(regex) {
    super()
    this.regex = regex
    this.files = []
  }

  addFile(file) {
    this.files.push(file)
    return this
  }

  find() {
    for (const file of this.files) {
      readFile(file, 'utf-8', (err, data) => {
        if (err) {
          return this.emit('error', err, file)
        }

        this.emit('fileread', file)

        // Match Regex
        const match = data.match(this.regex)
        if (match) {
          match.forEach(m => this.emit('match', m, file))
        }
      })
    }

    return this
  }
}

/**
 * If you comment out the 'error' event handler, the App will die.
 */
new FindRegex(/Hello/)
  .addFile('./a.txt')
  .addFile('./b.txt')
  .addFile('./c.txt')
  .addFile('./d.txt')
  .find()
  .on('error', (err, file) => console.log(`[Error] ${err} in FILE ${file}`))
  .on('fileread', file => console.log(`[Read file] "${file}"`))
  .on('match', (match, file) =>
    console.log(`[Match] "${match}" in FILE ${file}`),
  )
```

### Combining Events with Callbacks

Example

```js
/**
 * The traditional callback will give the final results.
 * The EventEmitter will give finer details.
 */

import glob from 'glob' // Doesn't work anymore

glob('*.txt', cb).on('match', cbMatch)
```

## Asynchronous CPS

### Executing Tasks in a Sequence

```js
const task1 = cb =>
  asyncOperation(() => {
    task2(cb)
  })

const task2 = cb =>
  asyncOperation(() => {
    task3(cb)
  })

const task3 = cb =>
  asyncOperation(() => {
    cb() // finally executes the callback
  })

task1(() =>
  // executed when task1, task2 and task3 are completed
  console.log('tasks 1, 2 and 3 executed'),
)
```

### The Sequential Iterator pattern

General Pattern

```js
const tasks = []

const finish = () => {
  // iteration completed
}

const iterate = index => {
  if (index === tasks.length) {
    return finish()
  }

  const task = tasks[index]

  task(() => iterate(index + 1))
}

iterate(0)
```

Generalize Even more...

```js
/**
 * @param {Array} collection
 * @param {Function} iteratorCallback For each item
 * @param {Function} finalCallback When all items are processed or on error
 */
const iterateSeries = (collection, iteratorCallback, finalCallback) => {}
```

Can be used to:

- **Map** values of an array asynchronously.
- Pass result of an operation to the next one in the iteration to implement
  an asynchronous version of the **reduce** algorithm.
- Quit the loop prematurely if a particular condition if met (asynchronous
  **Array.some()** helper.)
- Iterate over an infinite number of elements.

### The Unlimited Parallel Execution pattern

Run a set of asynchronous tasks in parallel by launching them all
at once, and then wait for all of them to complete by counting the
number of times their callbacks are invoked.

```js
const tasks = []
let completed = 0

tasks.forEach(task =>
  task(() => {
    completed += 1

    const isLast = completed === tasks.length
    if (isLast) {
      finish()
    }
  }),
)

const finish = () => {
  // all the tasks completed
}
```

## Promises

### Sequential Iteration with Promises

```js
const promise = tasks.reduce((prev, task) => {
  return prev.then(() => {
    return task();
  });
}, Promise.resolve());
```

### Unlimited Parallel Execution

Promise.all

### Limited Parallel Execution

#### Async Map with difference Concurrencies

[p-map](https://www.npmjs.com/package/p-map)

#### Run Async task with concurrency

[p-limit](https://www.npmjs.com/package/p-limit)

## Streams

### Client-Server Encryption

Server

```js
import { createDecipheriv, randomBytes } from 'crypto'

const secret = randomBytes(24)
console.log(`Generated secret: ${secret.toString('hex')}`) // share with client

const iv = Buffer.from(req.headers['x-initialization-vector'], 'hex')

req
  .pipe(createDecipheriv('aes192', secret, iv))
  .pipe(createGunzip())
```

Client

```js
import { createReadStream } from 'fs'
import { createCipheriv, randomBytes } from 'crypto'

const secret = Buffer.from(process.argv[4], 'hex')
const iv = randomBytes(16)

createReadStream(filePath)
  .pipe(createGzip())
  .pipe(createCipheriv('aes192', secret, iv))
```
