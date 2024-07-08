const express = require("express");
const compilerRouter = require("./routes/compiler");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

function init() {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.use("/compile", compilerRouter);

  app.listen(port);
}

init();
