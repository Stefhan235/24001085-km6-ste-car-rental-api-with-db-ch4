const express = require("express");
const router = express.Router();

const reservationController = require("../controller/rerservation");

router
    .route("/")
    .get(reservationController.getReservations)
    .post(reservationController.createReservation);

router
    .route("/:id")
    .get(reservationController.getReservation)
    .put(reservationController.updateReservation)
    .delete(reservationController.deleteReservation);

module.exports = router;
