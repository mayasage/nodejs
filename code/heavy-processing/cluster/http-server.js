const http = require("http");

const server = http.createServer();

server.listen(3000, () => console.log("Listening on port 3000"));

module.exports = server;
