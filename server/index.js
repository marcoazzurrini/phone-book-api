const bodyParser = require("body-parser");
const { mongoose } = require("./db");
const customer = require("./Routes/phonebook");
const user = require("./routes/user");
const express = require("express");
const app = express();

//added middleware code
app.use(bodyParser.json());
app.use("/customers", customer);

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);

const port = process.env.port || 3001;
app.listen(port, () => {
  console.log(`server listening at port :${port}`);
  console.log(`http://localhost:${port}/customers`);
});
