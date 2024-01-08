# Libraries

## Table Of Contents

- [Libraries](#libraries)
  - [Table Of Contents](#table-of-contents)
  - [Map with Different Concurrencies](#map-with-different-concurrencies)
  - [Run Async Tasks with Concurrency](#run-async-tasks-with-concurrency)
  - [Generate random stuff](#generate-random-stuff)
  - [Process CSV in Streaming fashion](#process-csv-in-streaming-fashion)
  - [Zip-Unzip](#zip-unzip)
  - [Archive multiple files](#archive-multiple-files)
  - [Create streams lazily](#create-streams-lazily)
  - [Ordered Limited Parallel Execution of Streams](#ordered-limited-parallel-execution-of-streams)
  - [Create Duplex stream](#create-duplex-stream)
  - [Combine Multiple Streams into One](#combine-multiple-streams-into-one)
  - [Demultiplex Conditionally](#demultiplex-conditionally)
  - [Url](#url)
  - [Delegates](#delegates)
  - [Inversion of Control](#inversion-of-control)
  - [core-js](#core-js)
  - [loopback](#loopback)
  - [vue](#vue)
  - [mobx](#mobx)
  - [levelUp](#levelup)
  - [level](#level)
  - [LevelUp Plugins](#levelup-plugins)
  - [Decorator Projects](#decorator-projects)
  - [Adapter Projects](#adapter-projects)
  - [object-path](#object-path)
  - [ini](#ini)
  - [json-over-tcp-2](#json-over-tcp-2)
  - [ZeroMQ](#zeromq)
  - [atDatabases](#atdatabases)
  - [koa](#koa)
  - [Middy](#middy)
  - [Module Bundlers](#module-bundlers)
  - [Transpiler](#transpiler)
  - [Chalk](#chalk)
  - [ip-regex](#ip-regex)
  - [node-re2](#node-re2)
  - [JSONStream](#jsonstream)
  - [event-stream](#event-stream)
  - [bfj](#bfj)
  - [React Familia](#react-familia)
  - [JSX Alternatives (No Transpiler Required)](#jsx-alternatives-no-transpiler-required)
  - [ESM Loader](#esm-loader)
  - [Express Alternative](#express-alternative)
  - [Unique String Generator](#unique-string-generator)
  - [Bluebird](#bluebird)
  - [Cancelable Async Flow](#cancelable-async-flow)
  - [Worker Pool Alternative](#worker-pool-alternative)
  - [Network Benchmarking Tool](#network-benchmarking-tool)
  - [Process Manager](#process-manager)
  - [Load Balancing](#load-balancing)
  - [Server Restart Supervisor](#server-restart-supervisor)
    - [Node.js Based Supervisors](#nodejs-based-supervisors)
    - [OS Based Supervisors](#os-based-supervisors)
    - [More advanced monitoring solutions](#more-advanced-monitoring-solutions)
    - [Container-based Runtimes](#container-based-runtimes)
    - [Infrastructure as a Code](#infrastructure-as-a-code)
  - [Service Registry](#service-registry)
  - [Build Reverse Proxy](#build-reverse-proxy)

## Map with Different Concurrencies

[p-map](https://www.npmjs.com/package/p-map)

## Run Async Tasks with Concurrency

[p-limit](https://www.npmjs.com/package/p-limit)

## Generate random stuff

[chance](https://www.npmjs.com/package/chance)

## Process CSV in Streaming fashion

[csv-parse](https://www.npmjs.com/package/csv-parse)

## Zip-Unzip

createGzip(): create zip
createGunzip(): unzip

## Archive multiple files

[archiver](https://www.npmjs.com/package/archiver)

## Create streams lazily

[lazystream](https://www.npmjs.com/package/lazystream)

## Ordered Limited Parallel Execution of Streams

[parallel-transform](https://www.npmjs.com/package/parallel-transform)

## Create Duplex stream

Stream1, Stream2: [duplexify](https://www.npmjs.com/package/duplexify)
Stream3: [duplexer2](https://www.npmjs.com/package/duplexer2)

pump + duplexify = [pumpify](https://www.npmjs.com/package/pumpify)

## Combine Multiple Streams into One

[multistream](https://www.npmjs.com/package/multistream)

## Demultiplex Conditionally

[ternary-stream](https://www.npmjs.com/package/ternary-stream)

## Url

[URL Class](https://nodejs.org/api/url.html#url_class_url)

## Delegates

When creating a proxy Object, you can use this to delegate methods that you
don't want to change.
Alternative to `Proxy` (ES6).

[delegates](https://www.npmjs.com/package/delegates)

## Inversion of Control

Allows us to shift the responsibility of wiring the modules of an application
during **Dependency Injection (DI)** to a third-party entity.

This entity can be a **service locator** (a simple component used to retrieve a
dependency, for example, `serviceLocator.get('db')`) or a
**dependency injection container** (a system that injects the dependencies into
a component based on some metadata specified in the code itself or in a
configuration file).

[inversify](https://www.npmjs.com/package/inversify)
[awilix](https://www.npmjs.com/package/awilix)

## core-js

One of the most complete polyfill libraries for JavaScript.

[core-js](https://www.npmjs.com/package/core-js)

## loopback

"A highly extensible Node.js and TypeScript framework for building APIs and
microservices."

Uses the Proxy pattern to provide the capability to intercept and enhance method
calls on controllers. This capability can be used to build custom validation or
authentication mechanisms.

[loopback](https://loopback.io/)

## vue

Has reimplemented observable properties using the Proxy pattern with the Proxy
object.

[vue](https://vuejs.org/)

## mobx

"Simple, scalable state management."

Implements reactive observables using the Proxy object.

[mobx](https://mobx.js.org/README.html)

## levelUp

A Node.js wrapper around Google's LevelDB.

[levelup](https://www.npmjs.com/package/levelup)
[LevelUp Ecosystem](https://github.com/Level/awesome)

DBs built upon LevelUP:

- [CouchDB clone](https://www.npmjs.com/package/pouchdb)
- [GraphDB](https://www.npmjs.com/package/levelgraph)

## level

Bundles both `levelup` and the default adapter called `leveldown`, which uses
"LevelDB" as the backend.

[level](https://www.npmjs.com/package/level)

## LevelUp Plugins

- [simple text searches](https://github.com/dominictarr/level-inverted-index)
- [atomic updates](https://github.com/eugeneware/levelplus)
- [abstract leveldown](https://www.npmjs.com/package/level-js)

## Decorator Projects

- [JSON over TCP](https://www.npmjs.com/package/json-socket)
- [Framework like Express](https://fastify.dev/)

## Adapter Projects

- [Multi-DB ORM](https://github.com/1602/jugglingdb/tree/master/lib/adapters)
- [DB Abstraction Library](https://nanosql.io/)
- [fs API on top of LevelUP](https://www.npmjs.com/package/level-filesystem)

## object-path

Access deep properties using a path.

[object-path](https://www.npmjs.com/package/object-path)

## ini

An ini format parser and serializer for node.

[ini](https://www.npmjs.com/package/ini)

## json-over-tcp-2

[messaging-in-json](https://www.npmjs.com/package/json-over-tcp-2)

## ZeroMQ

Messaging library.

[ZeroMQ](https://zeromq.org/)

## atDatabases

[atDatabases](https://www.atdatabases.org/)

## koa

Made by same team as Express.

[koa](https://koajs.com/)

## Middy

Node.js middleware engine for AWS Lambda

[middy](https://middy.js.org/)

## Module Bundlers

[webpack](https://webpack.js.org/) - most complete & mature
[parcel](https://parceljs.org/) - work "auto-magically"

[rollup](https://rollupjs.org/) - fully support ESM & offers customizations like
tree shaking & dead-code elimination

[browserify](https://browserify.org/) - supports commonjs

Others

[fuse-box](https://github.com/fuse-box/fuse-box)
[brunch](https://brunch.io/)
[microbundle](https://www.npmjs.com/package/microbundle)

## Transpiler

[babel](https://babeljs.io/)

## Chalk

[Format text for Terminal](https://www.npmjs.com/package/chalk)

## ip-regex

[Match IP Address](https://www.npmjs.com/package/ip-regex)

## node-re2

This project provides bindings for RE2: fast, safe alternative to backtracking
regular expression.

[node-re2](https://www.npmjs.com/package/re2)

## JSONStream

streaming JSON.parse and stringify

[JSONStream](https://www.npmjs.com/package/JSONStream)

## event-stream

Array-like functions on Streams.

[event-stream](https://www.npmjs.com/package/event-stream)

## bfj

Asynchronous streaming functions for large JSON data sets.
It uses partitioning-on-the-Event-Loop.

[Big Friendly JSON](https://www.npmjs.com/package/bfj)

## React Familia

[Mobile](https://reactnative.dev/)
[2D Rending with OpenGL](https://github.com/pixijs/pixi-react)
[3D Scenes](https://github.com/pmndrs/react-three-fiber)
[Hardware](https://github.com/iamdustan/react-hardware)

[Only cache the most recent](https://www.npmjs.com/package/memoize-one)
[Error Boundary Class](https://www.npmjs.com/package/react-error-boundary)

## JSX Alternatives (No Transpiler Required)

[htm](https://www.npmjs.com/package/htm)
[esx](https://github.com/esxjs/esx)

## ESM Loader

[esm](https://www.npmjs.com/package/esm)

## Express Alternative

[fastify](https://www.npmjs.com/package/fastify)
[serve static files](https://www.npmjs.com/package/@fastify/static)

## Unique String Generator

[A tiny, secure, URL-friendly, unique string ID generator for JavaScript.](https://www.npmjs.com/package/nanoid)

## Bluebird

[Can cancel promises](https://www.npmjs.com/package/bluebird)

## Cancelable Async Flow

[CAF](https://www.npmjs.com/package/caf)

## Worker Pool Alternative

[piscina](https://www.npmjs.com/package/piscina)

## Network Benchmarking Tool

[autocannon](https://www.npmjs.com/package/autocannon)

## Process Manager

[pm2](https://www.npmjs.com/package/pm2)

[socket + pm2](https://www.npmjs.com/package/sticky-session)

Needed if you want stateful communication between client & server.
Socket.io require sticky load balancing.
Another option to maintain stateful communication would be to use a common
store to store sessions, like DBs or even better in-memory stores.

## Load Balancing

[nginx](http://nginx.org/)
This is a web server, reverse proxy, and load balancer, built upon the
non-blocking I/O model.

[haproxy](https://www.haproxy.org/)
This is a fast load balancer for TCP/HTTP traffic.

NodeJS-based proxies
Cloud-based proxies

## Server Restart Supervisor

### Node.js Based Supervisors

[forever](https://www.npmjs.com/package/forever)
[pm2](https://www.npmjs.com/package/pm2)

### OS Based Supervisors

[systemd](https://www.freedesktop.org/wiki/Software/systemd/)
[runit](http://smarden.org/runit/)

### More advanced monitoring solutions

[monit](https://mmonit.com/)
[supervisord](http://supervisord.org/)

### Container-based Runtimes

[Kubernetes](https://kubernetes.io/)
[Nomad](https://www.nomadproject.io/)
[Docker Swarm](https://docs.docker.com/engine/swarm/)

### Infrastructure as a Code

[Terraform](https://www.terraform.io/)
[Ansible](https://www.ansible.com/)
[Packer](https://www.packer.io/)

## Service Registry

[consul](https://www.consul.io/)

## Build Reverse Proxy

[http-proxy](https://www.npmjs.com/package/http-proxy)
To simplify the creation of a reverse proxy/load balancer in Node.js

[node-portfinder](https://www.npmjs.com/package/portfinder)
To find a free port in the system

[consul](https://www.npmjs.com/package/consul)
To interact with Consul
