# workerpool

## Table Of Contents

- [workerpool](#workerpool)
  - [Table Of Contents](#table-of-contents)
  - [Description](#description)
  - [Load](#load)
    - [Browser](#browser)
  - [Use](#use)
    - [Offload functions dynamically](#offload-functions-dynamically)
    - [Dedicated Workers](#dedicated-workers)
  - [API](#api)
    - [pool](#pool)
      - [Options](#options)
  - [Two Pools](#two-pools)
    - [Workers](#workers)
    - [Pools](#pools)

## Description

- There is a pool of workers to execute tasks.
- New tasks are put in a queue.

- A worker executes one task at a time, and once finished, picks a new task
  from the queue.

- Workers can be accessed via a natural, promise based proxy, as if they are
  available straight in the main application.

## Load

- Node.js - `const workerpool = require('workerpool');`
- Browser - `<script src="workerpool.js"></script>`
- Web Worker - `importScripts('workerpool.js');`

### Browser

Option-1: Local Download

```html
<script src="workerpool.min.js"></script>
```

Option-2: CDN Download

```html
<script
  src="https://cdn.jsdelivr.net/npm/workerpool@6.4.2/dist/workerpool.min.js"
  integrity="sha256-d/ykfModKZvsXsED8P6taPH0rjJmpPp2giK24UUutD8="
  crossorigin="anonymous"
></script>
```

Option-3: CDN Import

```html
<script type="module">
  import workerpool from 'https://cdn.jsdelivr.net/npm/workerpool@6.4.2/+esm'
  // Your code
</script>
```

## Use

- Offload functions dynamically
- Dedicated Workers

### Offload functions dynamically

1. Create a `pool`.
2. Create your function.
3. Pass your function arguments to `pool.exec`.

```js
const pool = wp.pool()
const add = (a, b) => a + b
pool.exec(add, [2, 3])
```

### Dedicated Workers

1. Create a script and register functions on a `worker`. This worker will be
   called a dedicated worker.

2. This worker can be used by any `pool`.

node.js

```js
import { worker } from 'workerpool'
const add = (a, b) => a + b
worker({ add })
```

pool.exec.js

```js
const ex = wp.pool(join(__dirname, './node.js'))
ex.exec('add', [2, 3])
```

pool-proxy.js

```js
const pr = wp.pool(join(__dirname, './node.js'))
const p = await pool.proxy()
p.add(2, 3)
```

NOTE:-
A "Dedicated" worker, doesn't automatically mean a new Thread.
Think of it as a group of functions.

## API

2 parts:

- `pool` to create pool
- `worker` to create worker

### pool

`workerpool.pool([script: string] [, options: Object]) : Pool`

- When a script argument is provided, the provided script will be started as a
  dedicated worker. This means that only the functions registered from that
  script can be called by the workers in this pool.

- When no script argument is provided, a default worker is started which can be
  used to offload functions dynamically via `pool.exec`.

#### Options

- minWorkers: `Number` | maxWorkers
- maxWorkers: `Number` | (CPUs - 1) | 3
- maxQueueSize: `Infinity`

- workerType: 'auto' | 'web' | 'process' | 'thread'

  - auto:
    - 'web' in browser
    - 'worker_threads' in `Node.js >= 11.7.0`
    - 'child_process', otherwise

  - web: `Web Worker`
  - process: `child_process`
  - thread: `worker_thread` | Error

- workerTerminateTimeout: `Number` | 1000 : kill worker in x ms

Ref: `https://www.npmjs.com/package/workerpool`

## Two Pools

- 1 light pool
- 1 heavy pool

### Workers

light.js

```js
import { worker } from 'workerpool'
const l = () => 'l'
worker({ l })
```

heavy.js

```js
import { worker } from 'workerpool'
const h = () => 'h'
worker({ h })
```

### Pools

two-pool.js

```js
const lp = wp.pool(join(__dirname, './light.js'))
const hp = wp.pool(join(__dirname, './heavy.js'))

// Works
lp.exec('l', [2, 3])
hp.exec('h', [2, 3])

// Won't work. Function is not registered in the dedicated worker.
lp.exec('h', [2, 3])
hp.exec('l', [2, 3])
```

free-pool.js (if you want)

```js
const fp = wp.pool()

const add = (a, b) => a + b
fp.exec(add, [3, 6])
```
