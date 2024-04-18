const reservationUsecase = require("../usecase/reservation");

exports.getReservations = async (req, res, next) => {
    try {
        const data = await reservationUsecase.getReservations();

        res.status(200).json({
            message: "SUCCESS",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getReservation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await reservationUsecase.getReservation(id);
        if (!data) {
            return next({
                message: `Reservation with id ${id} is not found!`,
                statusCode: 404,
            });
        }

        res.status(200).json({
            message: "SUCCESS",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createReservation = async (req, res, next) => {
    try {
        const { reservationDate, returnDate, car_id, user_id } = req.body;
        if (!reservationDate || reservationDate == "") {
            return next({
                message: "Reservation Date must be provided!",
                statusCode: 404,
            });
        }
        if (!returnDate || returnDate == "") {
            return next({
                message: "Return Date must be provided!",
                statusCode: 404,
            });
        }
        if (!car_id || car_id == "") {
            return next({
                message: "car_id must be provided!",
                statusCode: 404,
            });
        }
        if (!user_id || user_id == "") {
            return next({
                message: "user_id must be provided!",
                statusCode: 404,
            });
        }

        const data = await reservationUsecase.createReservation({
            reservationDate,
            returnDate,
            car_id,
            user_id,
        });

        res.status(201).json({
            message: "SUCCESS",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateReservation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { reservationDate, returnDate, car_id, user_id } = req.body;
        if (!reservationDate || reservationDate == "") {
            return next({
                message: "Reservation Date must be provided!",
                statusCode: 404,
            });
        }
        if (!returnDate || returnDate == "") {
            return next({
                message: "Return Date must be provided!",
                statusCode: 404,
            });
        }
        if (!car_id || car_id == "") {
            return next({
                message: "car_id must be provided!",
                statusCode: 404,
            });
        }
        if (!user_id || user_id == "") {
            return next({
                message: "user_id must be provided!",
                statusCode: 404,
            });
        }

        const data = await reservationUsecase.updateReservation(id, {
            reservationDate,
            returnDate,
            car_id,
            user_id,
        });

        res.status(200).json({
            message: "SUCCESS",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteReservation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await reservationUsecase.deleteReservation(id);

        res.status(200).json({
            message: "SUCCESS",
            data,
        });
    } catch (error) {
        next(error);
    }
};
