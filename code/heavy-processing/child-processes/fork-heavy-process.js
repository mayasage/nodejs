const { fork } = require("child_process");
const server = require("./http-server");
const TestFile = require("../utils/TestFile");
// const blockingFunction = require("../utils/blocking-function");

const forkHeavyProcess = async () => {
  const file = `
  const blockingFunction = require("/home/kratikal/one/syncnow/learn/js/node/heavy-processing/utils/blocking-function");

  process.on("message", () => {
    blockingFunction();
    process.exit(0);
  });`;

  const testFile = new TestFile(file);
  testFile.create();

  const child = fork(testFile.path);
  child.send("start!");
  await new Promise((resolve) => {
    child.on("close", () => {
      console.log(`fork complete`);
      testFile.delete();
      resolve();
    });
  });
};

server.on("request", async (req, res) => {
  switch (req.url) {
    case "/heavy": {
      // blockingFunction(); // blocks the main thread
      await forkHeavyProcess();
      res.end(`Heavy process completed.`);
      break;
    }

    case "/light": {
      res.end(`Light process completed.`);
      break;
    }
  }
});
