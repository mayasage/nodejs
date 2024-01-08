# Explanation

## Table Of Contents

- [Explanation](#explanation)
  - [Table Of Contents](#table-of-contents)
  - [Module Resolution](#module-resolution)
    - [Phase 1: Parsing](#phase-1-parsing)
    - [Phase 2: Instantiation](#phase-2-instantiation)
    - [Phase 3: Evaluation](#phase-3-evaluation)

## Module Resolution

```js
// a.js
import * as bModule from "./b.js";

export let loaded = false;
export const b = bModule;

loaded = true;

// b.js
import * as aModule from "./a.js";

export let loaded = false;
export const a = aModule;

loaded = true;

// main.js
import * as a from "./a.js";
import * as b from "./b.js";

console.log("a ->", a);
console.log("b ->", b);
```

Output:

```console
a -> <ref *1> [Module: null prototype] {
  b: [Module: null prototype] { a: [Circular *1], loaded: true },
  loaded: true
}
b -> <ref *1> [Module: null prototype] {
  a: [Module: null prototype] { b: [Circular *1], loaded: true },
  loaded: true
}
```

Explanation:

### Phase 1: Parsing

Interpreter builds a view of the dependencies into a tree-like structure.
Cycles are removed.

main.js -> a.js -> b.js

### Phase 2: Instantiation

Link all modules with each other in the Tree-like structure.

### Phase 3: Evaluation

Execution of code in bottom-up manner.
All the links are converted into references.

b.js -> a.js -> main.js
