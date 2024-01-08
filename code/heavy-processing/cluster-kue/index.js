require("./setup/setup-workerpool")("./kue.js");

const app = require("./setup/setup-express")();
require("./setup/setup-morgan")(app);
require("./setup/setup-kue")({ app });
require("./setup/setup-routes")(app);

app.listen(3000, () =>
  console.log(`Child ${process.pid} is listening on port 3000`)
);
