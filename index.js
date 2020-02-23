// const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
// const Joi = require("joi");
const logger = require("./middleware/logger");
const users = require("./routes/user");
const home = require("./routes/home");
const cacheControl = require("express-cache-controller");
const cors = require("cors");

const express = require("express");
const app = new express();

app.use(
  cacheControl({
    noCache: true
  })
);
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(helmet());

app.use("/", home);
app.use("/api/users", users);

//configuration
// console.log("Application Name: " + config.get("name"));
// console.log("Mail Server: " + config.get("mail.host"));
// console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan Enabled.");
}
app.use(logger);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
