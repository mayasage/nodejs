const server = require("./http-server");
const blockingFunction = require("../utils/blocking-function");

server.on("request", async (req, res) => {
  switch (req.url) {
    case "/heavy": {
      process.send(`I am Worker No. ${process.pid} performing heavy.`);
      blockingFunction(); // blocks the main thread
      res.end(`Heavy process completed.`);
      break;
    }

    case "/light": {
      process.send(`I am Worker No. ${process.pid} performing light.`);
      res.end(`Light process completed.`);
      break;
    }
  }
});
