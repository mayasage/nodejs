const convertToNumber = require("./convert-to-number");

const rand = () => Math.random().toString(36).slice(2);

const makeRandomSymbols = (count) => {
  const symbols = [];
  count = convertToNumber(count);

  if (convertToNumber(count)) {
    while (count !== 0) {
      symbols.push(`{{${rand()}}}`);
      count--;
    }
  }

  return symbols;
};

module.exports = makeRandomSymbols;
