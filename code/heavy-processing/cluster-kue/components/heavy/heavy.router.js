const express = require("express");
const { heavyProcessingHandler } = require("./heavy.handler");

const router = express.Router();

router.get("/", heavyProcessingHandler);

module.exports = router;
