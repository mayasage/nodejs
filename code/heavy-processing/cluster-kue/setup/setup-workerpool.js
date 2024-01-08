const wp = require("workerpool");
const cores = require("os").cpus().length;

let instance;

const setup = (pathToScriptFile) => {
  if (!instance) {
    instance = wp.pool(pathToScriptFile, {
      minWorkers: cores,
      maxWorkers: cores,
      workerType: "thread",
    });

    const stats = instance.stats();
    console.log(`${stats.totalWorkers} Threads up on Child ${process.pid}.`);
  }

  return instance;
};

module.exports = setup;
