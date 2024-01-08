const cluster = require("cluster");
const numberOfCores = require("os").cpus().length;
const path = require("path");
require("./setup/setup-config");
require("./setup/setup-kue")({ setGlobalKueEvents: "true" });
require("./setup/setup-sequelize")();

// console.log(cluster.isMaster);
// console.log(cluster.isWorker);

console.log(`I am Master process ${process.pid}`);

cluster.setupPrimary({
  exec: "index.js",
});

for (let i = 0; i < numberOfCores; i++) {
  worker = cluster.fork(path.join(__dirname, "index.js"));
  worker.on("message", (msg) => console.log(msg));
}

cluster.on("online", (worker) => {
  console.log(`Child ${worker.process.pid} is online!`);
});

cluster.on("exit", (worker, code, signal) => {
  console.log(`Child ${worker.process.pid} is down!`);
  console.log("Attempting to restart Worker!");
  cluster.fork();
});
