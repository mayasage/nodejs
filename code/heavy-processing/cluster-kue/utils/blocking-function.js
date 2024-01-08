const blockingFunction = () => {
  for (let i = 0; i < 9999999999; i++) {}
};

module.exports = blockingFunction;
