const express = require("express");
const { Customer } = require("../Models/Customer");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, (req, resp) => {
  try {
    Customer.find((err, docs) => {
      if (err)
        console.log(
          "Error while getting customers..." + JSON.stringify(err, undefined, 2)
        );
      else resp.send(docs);
    });
  } catch (e) {
    resp.send({ message: "Private route, please login." });
  }
});

router.post("/", auth, (req, resp) => {
  let cust = new Customer({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gender: req.body.gender,
    age: req.body.age,
    email: req.body.email
  });
  try {
    cust.save((err, doc) => {
      if (err)
        console.log(
          "error in saving customers..." + JSON.stringify(err, undefined, 2)
        );
      else resp.send(doc);
    });
  } catch (e) {
    resp.send({ message: "Private route, please login." });
  }
});

router.put("/:id", auth, (req, resp) => {
  try {
    let customerId = req.params.id;
    if (!ObjectId.isValid(customerId))
      return resp.status(400).send(`Customer not found for id :${customerId}`);
  } catch (e) {
    resp.send({ message: "Private route, please login." });
  }
});

router.delete("/:id", auth, (req, resp) => {
  try {
    let customerId = req.params.id;
    if (!ObjectId.isValid(customerId))
      return resp.status(400).send(`Customer not found for id :${customerId}`);

    Customer.deleteOne({ _id: customerId }, (err, docs) => {
      if (err)
        console.log(
          "Error while deleting customers..." +
            JSON.stringify(err, undefined, 2)
        );
      else resp.send(docs);
    });
  } catch (e) {
    resp.send({ message: "Private route, please login." });
  }
});

module.exports = router;
