const express = require("express");
const router = express.Router();

const customerController = require("../controller/customer");

router
    .route("/")
    .get(customerController.getCustomers)
    .post(customerController.createCustomer);

router
    .route("/:id")
    .get(customerController.getCustomer)
    .put(customerController.updateCustomer)
    .delete(customerController.deleteCustomer);

module.exports = router;
