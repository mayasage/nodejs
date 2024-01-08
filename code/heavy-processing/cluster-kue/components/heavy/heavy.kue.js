const blockingFunction = require("./blocking-function");

const processHeavy = (job, done) => {
  blockingFunction(job);
  console.log("Ok. I'm done.");
  done();
};

module.exports = {
  processHeavy,
};
