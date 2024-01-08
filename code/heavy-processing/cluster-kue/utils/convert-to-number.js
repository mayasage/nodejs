/**
 * Tries to change the following into a Number:
 *   - String
 *
 * @param {String | Number} x
 * @returns {Number | undefined}
 */
const convertToNumber = (x) => {
  let result;

  if (x) {
    switch (typeof x) {
      case "number": {
        result = x;
        break;
      }

      case "string": {
        const _ = +x;

        if (!Number.isNaN(_)) {
          result = _;
        }
      }
    }
  }

  return result;
};

module.exports = convertToNumber;
