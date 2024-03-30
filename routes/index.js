const express = require("express");
const router = express.Router();
const car = require("./car");
const customer = require("./customer");
const reservation = require("./reservation");

router.use("/cars", car);
router.use("/customers", customer);
router.use("/reservations", reservation);

module.exports = router;
