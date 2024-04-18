const express = require("express");
const router = express.Router();
const reservationController = require("../controller/rerservation");
const { authMiddleware } = require("../middleware/auth");

router
    .route("/")
    .get(
        authMiddleware(["user", "admin"]),
        reservationController.getReservations
    )
    .post(
        authMiddleware(["user", "admin"]),
        reservationController.createReservation
    );

router
    .route("/:id")
    .get(
        authMiddleware(["user", "admin"]),
        reservationController.getReservation
    )
    .put(authMiddleware(["admin"]), reservationController.updateReservation)
    .delete(authMiddleware(["admin"]), reservationController.deleteReservation);

module.exports = router;
