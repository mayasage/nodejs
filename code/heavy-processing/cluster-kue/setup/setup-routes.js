const setup = (app) => {
  const lightRouter = require("../components/light/light.router");
  const heavyRouter = require("../components/heavy/heavy.router");
  const emailRouter = require("../components/email/email.router");
  const newsletterRouter = require("../components/newsletter/newsletter.router");

  app.use("/light", lightRouter);
  app.use("/heavy", heavyRouter);
  app.use("/email", emailRouter);
  app.use("/newsletter", newsletterRouter);
};

module.exports = setup;
