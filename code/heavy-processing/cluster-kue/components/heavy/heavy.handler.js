const kue = require("../../setup/setup-kue")();

const heavyProcessingHandler = (req, res, next) => {
  // process.send(`I am Worker No. ${process.pid} performing heavy.`);

  kue
    .getKue()
    .create("heavy-process", {
      title: "heavy-process",
    })
    .save();

  // blockingFunction(); // blocks the main thread
  res.end(`Heavy processing scheduled.`);
};

module.exports = {
  heavyProcessingHandler,
};
