const carUsecase = require("../usecase/car");

exports.getCars = async (req, res, next) => {
    try {
        const data = await carUsecase.getCars();

        res.status(200).json({
            message: "SUCCESS",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getCar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await carUsecase.getCar(id);
        if (!data) {
            return next({
                message: `Car with id ${id} is not found!`,
                statusCode: 404,
            });
        }

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createCar = async (req, res, next) => {
    try {
        const {
            brand,
            model,
            plate,
            type,
            transmission,
            year,
            capacity,
            rentPerDay,
            available,
            availableAt,
        } = req.body;
        const { image } = req.files;
        if (!brand || brand == "") {
            return next({
                message: "Brand must be provided!",
                statusCode: 400,
            });
        }
        if (!model || model == "") {
            return next({
                message: "Model must be provided!",
                statusCode: 400,
            });
        }
        if (!plate || plate == "") {
            return next({
                message: "Plate must be provided!",
                statusCode: 400,
            });
        }
        if (!type || type == "") {
            return next({
                message: "Type must be provided!",
                statusCode: 400,
            });
        }
        if (!transmission || transmission == "") {
            return next({
                message: "Transmission must be provided!",
                statusCode: 400,
            });
        }
        if (!year || year == "") {
            return next({
                message: "Year must be provided!",
                statusCode: 400,
            });
        }
        if (!capacity || capacity == "") {
            return next({
                message: "Capacity must be provided!",
                statusCode: 400,
            });
        }
        if (!rentPerDay || rentPerDay == "") {
            return next({
                message: "Rent Per Day must be provided!",
                statusCode: 400,
            });
        }
        if (!available || available == "") {
            return next({
                message: "Available must be provided!",
                statusCode: 400,
            });
        }
        if (!availableAt || availableAt == "") {
            return next({
                message: "Available At must be provided!",
                statusCode: 400,
            });
        }

        const data = await carUsecase.createCar({
            brand,
            model,
            plate,
            image,
            type,
            transmission,
            year,
            capacity,
            rentPerDay,
            available,
            availableAt,
        });

        res.status(201).json({
            message: "SUCCESS",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateCar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            brand,
            model,
            plate,
            type,
            transmission,
            year,
            capacity,
            rentPerDay,
            available,
            availableAt,
        } = req.body;
        const { image } = req.files;
        if (!brand || brand == "") {
            return next({
                message: "Brand must be provided!",
                statusCode: 400,
            });
        }
        if (!model || model == "") {
            return next({
                message: "Model must be provided!",
                statusCode: 400,
            });
        }
        if (!plate || plate == "") {
            return next({
                message: "Plate must be provided!",
                statusCode: 400,
            });
        }
        if (!type || type == "") {
            return next({
                message: "Type must be provided!",
                statusCode: 400,
            });
        }
        if (!transmission || transmission == "") {
            return next({
                message: "Transmission must be provided!",
                statusCode: 400,
            });
        }
        if (!year || year == "") {
            return next({
                message: "Year must be provided!",
                statusCode: 400,
            });
        }
        if (!capacity || capacity == "") {
            return next({
                message: "Capacity must be provided!",
                statusCode: 400,
            });
        }
        if (!rentPerDay || rentPerDay == "") {
            return next({
                message: "Rent Per Day must be provided!",
                statusCode: 400,
            });
        }
        if (!available || available == "") {
            return next({
                message: "Available must be provided!",
                statusCode: 400,
            });
        }
        if (!availableAt || availableAt == "") {
            return next({
                message: "Available At must be provided!",
                statusCode: 400,
            });
        }

        const data = await carUsecase.updateCar(id, {
            brand,
            model,
            plate,
            image,
            type,
            transmission,
            year,
            capacity,
            rentPerDay,
            available,
            availableAt,
        });

        res.status(200).json({
            message: "SUCCESS",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteCar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await carUsecase.deleteCar(id);

        res.status(200).json({
            message: "SUCCESS",
            data,
        });
    } catch (error) {
        next(error);
    }
};
