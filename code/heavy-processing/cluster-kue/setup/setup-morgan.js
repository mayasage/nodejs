const morgan = require("morgan");

const setupMorgan = (app) => {
  app.use(
    morgan(
      function (tokens, req, res) {
        return [
          `Child ${process.pid}`,
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, "content-length"),
          "-",
          tokens["response-time"](req, res),
          "ms",
        ].join(" ");
      },
      {
        skip: (req) => req.originalUrl.startsWith("/queue"),
      }
    )
  );
};

module.exports = setupMorgan;
