import fs from "fs";
import csvParser from "csv-parser";
import path from "path";

const csvIsValid = (csvFilePath) => {
  // Check if csvFile & csvFilePath is valid.
  return true;
};

/**
 * @param {String} csvFilePath
 *
 * @param {{ errorFn: Function,
 * parseFn: Function,
 * normalizeFn: Function,
 * stopOnFirstError: Boolean,
 * uniqueFields: Array<String>,
 * onlyCheckIfCSVIsValid: Boolean }
 * } options errorFn will be return an array of errors on each line.
 *
 * @returns {{data: Array; errors: Array}}
 */
const parseCSV = (csvFilePath, options = {}) =>
  new Promise((resolve, reject) => {
    try {
      const results = {
        validData: [],
        errors: [],
      };

      const trackUniqueness = {};

      const errorFn = options.errorFn || (() => []);
      const parseFn = options.parseFn || ((data) => data);
      const normalizeFn = options.normalizeFn || ((data) => data);
      const stopOnFirstError = options.stopOnFirstError;

      const uniqueFields = options.uniqueFields || [];
      uniqueFields.forEach((field) => (trackUniqueness[field] = {}));

      if (!csvIsValid(csvFilePath)) {
        throw new Error("CSV is Invalid ❗");
      }

      if (options.onlyCheckIfCSVIsValid) {
        return;
      }

      const readStream = fs.createReadStream(csvFilePath);
      const csvStream = readStream.pipe(csvParser({ separator: "," }));
      let lineNumber = 0;

      csvStream
        .on("data", function (data) {
          lineNumber += 1;

          data = normalizeFn(data);

          const errors = errorFn(data);
          const parsedData = parseFn(data);

          for (const field of uniqueFields) {
            const fieldVal = parsedData[field];
            const isInTrackUniqueness = !!trackUniqueness[field][fieldVal];

            if (isInTrackUniqueness) {
              results.errors.push({
                line: data,
                lineNumber,
                errors: [`Duplicate value found for "${field}": ${fieldVal}`],
              });
            }
          }

          if (errors.length > 0) {
            results.errors.push({
              line: data,
              lineNumber,
              errors,
            });
          }

          if (stopOnFirstError && results.errors.length > 0) {
            csvStream.destroy();
            return;
          }

          results.validData.push({
            parsedData,
            lineNumber,
          });
        })
        .on("close", function () {
          readStream.unpipe(csvStream);
          readStream.destroy();

          return resolve(results);
        })
        .on("error", (err) => {
          throw err;
        });

      readStream.on("error", (err) => {
        throw err;
      });
    } catch (err) {
      reject(err);
    }
  });

export default parseCSV;

// const index = async (req, res, next) => {
//   try {
//     let result;
//     const readStream = fs.createReadStream(
//       path.join(__dirname, "../../../public/certificates.csv")
//     );
//     const csvStream = readStream.pipe(csvParser({ separator: "," }));
//     csvStream
//       .on("data", function (data) {
//         console.log(data["Certificate number"], req.query.cnum);
//         if (data["Certificate number"] == req.query.cnum) {
//           csvStream.destroy();
//           result = data;
//           return res.status(200).json(data);
//         }
//       })
//       .on("close", function () {
//         readStream.unpipe(csvStream);
//         readStream.destroy();
//         if (!result) next(new RequestError("Certificate Not Found ❗", 200));
//       })
//       .on("error", (err) =>
//         next(new RequestError("Internal Server Error ❌", 500, err))
//       );

//     readStream.on("error", (err) =>
//       next(new RequestError("Internal Server Error ❌", 500, err))
//     );
//   } catch (err) {
//     next(new RequestError("Internal Server Error ❌", 500, err));
//   }
// };
