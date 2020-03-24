const express = require("express");
const app = express();
const request = require("supertest");
const bodyParser = require("body-parser");
const { mongoose } = require("../db");
const customer = require("../Routes/phonebook");
const user = require("../routes/user");

//added middleware code
app.use(bodyParser.json());
app.use("/customers", customer);
app.use("/user", user);

describe("Post Endpoints", () => {
  it("should create a new post", (done) => {
    const res = await request(app)
      .post("/customers")
      .send({
        userId: 1,
        title: "test is cool"
      })
      .end();

    expect(res.statusCode).toEqual(500);
  });
});
