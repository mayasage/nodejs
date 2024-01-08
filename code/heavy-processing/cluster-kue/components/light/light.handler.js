const lightProcessingHandler = (req, res, next) => {
  // process.send(`I am Worker No. ${process.pid} performing light.`);
  res.end(`Light process completed.`);
};

module.exports = {
  lightProcessingHandler,
};
