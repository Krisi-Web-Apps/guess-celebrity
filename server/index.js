require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// common middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
const { initialRouter } = require("./routers");
app.use("/", initialRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started on port: " + process.env.PORT);
});
