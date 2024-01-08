# Explanation

## Table Of Contents

- [Explanation](#explanation)
  - [Table Of Contents](#table-of-contents)
  - [Modifying Other Modules](#modifying-other-modules)

## Modifying Other Modules

```js
// mock-read-file.js
import fs from "fs";

const originalReadFile = fs.readFile;
let mockedResponse = null; // Buffer

function mockedReadFile(path, cb) {
  setImmediate(() => {
    cb(null, mockedResponse);
  });
}

export function mockEnable(respondWith) {
  mockedResponse = respondWith;
  fs.readFile = mockedReadFile; // Changing in DEFAULT export
}

export function mockDisable() {
  fs.readFile = originalReadFile;
}

// main.js
import fs from "fs"; // Importing DEFAULT export

import { mockEnable, mockDisable } from "./mock-read-file.js";

mockEnable(Buffer.from("Hello World"));

fs.readFile("fake-path", (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(data.toString()); // 'Hello World'
});

mockDisable();
```

This won't work:

```js
// main.js

import * as fs from "fs"; // fs.readFile will import NAMED export
import { readFile } from "fs"; // Importing NAMED export
```

because we're importing NAMED export, while we made changes to the DEFAULT
export.

To make this work we can use `syncBuiltinESMExports`:

```js
import { syncBuiltinESMExports } from "module";
mockEnable(Buffer.from("Hello World"));
syncBuiltinESMExports();
/**
 * propagate any external change applied to the module functionality
 * even to named exports
 * /
```

Example

```js
import fs, { readFileSync } from "fs";
import { syncBuiltinESMExports } from "module";

let orig = fs.readFileSync;

// Change to mock in DEFAULT export
fs.readFileSync = () => Buffer.from("Hello, ESM");
syncBuiltinESMExports();

console.log(fs.readFileSync === readFileSync); // true

// Change to original in DEFAULT export
fs.readFileSync = orig;
syncBuiltinESMExports();

console.log(fs.readFileSync === readFileSync); // true
```
