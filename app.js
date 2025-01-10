require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.HOST_PORT;
const domain = process.env.HOST_DOMAIN;
var cors = require("cors");

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

const movies = require("./routers/movie.js");
app.use("/movies", movies);

const errorsHandler = require("./middlewares/error.js");
app.use(errorsHandler.errorsHandler);
app.use(errorsHandler.notFound);

app.listen(port, () => {
  console.log(`Server online all'indirizzo: ${domain}:${port}`);
});
