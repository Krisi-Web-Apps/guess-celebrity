require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { errorHandler } = require("./config/middlewares");

const app = express();

// common middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
const { initialRouter, usersRouter, celebritiesRouter, statsRouter } = require("./routers");
app.use("/", initialRouter);
app.use("/users", usersRouter);
app.use("/celebrities", celebritiesRouter);
app.use("/stats", statsRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server started on port: " + process.env.PORT);
  console.log(process.env.NODE_ENV);
});
