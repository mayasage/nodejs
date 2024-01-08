const cluster = require("cluster");
const numberOfCores = require("os").cpus().length;
const path = require("path");

// console.log(cluster.isMaster);
// console.log(cluster.isWorker);

cluster.setupPrimary({
  exec: "index.js",
});

for (let i = 0; i < numberOfCores; i++) {
  console.log("I am master");
  worker = cluster.fork(path.join(__dirname, "index.js"));
  worker.on("message", (msg) => console.log(msg));
}

cluster.on("online", (worker) => {
  console.log(`Worker ${worker.process.pid} is online!`);
});

cluster.on("exit", (worker, code, signal) => {
  console.log(`Worker ${worker.process.pid} is down!`);
  console.log("Attempting to restart Worker!");
  cluster.fork();
});
