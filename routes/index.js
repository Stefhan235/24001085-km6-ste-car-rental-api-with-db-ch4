const express = require("express");
const router = express.Router();
const car = require("./car");
const reservation = require("./reservation");
const auth = require("./auth");

router.use("/cars", car);
router.use("/auth", auth);
router.use("/reservations", reservation);

module.exports = router;
