const express = require("express");
const morgan = require("morgan");
const router = require("./app/routes/index");

const app = express();
const { PORT } = process.env;

app.use(morgan("dev"));

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Express is listening on port:${PORT}`);
});
