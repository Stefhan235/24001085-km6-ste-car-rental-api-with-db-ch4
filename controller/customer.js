const customerUsecase = require("../usecase/customer");

exports.getCustomers = async (req, res, next) => {
    try {
        const data = await customerUsecase.getCustomers();

        res.status(200).json({
            message: "SUCCESS",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await customerUsecase.getCustomer(id);
        if (!data) {
            return next({
                message: `Customer with id ${id} is not found!`,
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

exports.createCustomer = async (req, res, next) => {
    try {
        const { name, address, phoneNumber } = req.body;
        if (!name || name == "") {
            return next({
                message: "Name must be provided!",
                statusCode: 404,
            });
        }
        if (!address || address == "") {
            return next({
                message: "Address must be provided!",
                statusCode: 404,
            });
        }
        if (!phoneNumber || phoneNumber == "") {
            return next({
                message: "Phone Number must be provided!",
                statusCode: 404,
            });
        }

        const data = await customerUsecase.createCustomer({
            name,
            address,
            phoneNumber,
        });

        res.status(201).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, address, phoneNumber } = req.body;
        if (!name || name == "") {
            return next({
                message: "Name must be provided!",
                statusCode: 404,
            });
        }
        if (!address || address == "") {
            return next({
                message: "Address must be provided!",
                statusCode: 404,
            });
        }
        if (!phoneNumber || phoneNumber == "") {
            return next({
                message: "Phone Number must be provided!",
                statusCode: 404,
            });
        }

        const data = await customerUsecase.updateCustomer(id, {
            name,
            address,
            phoneNumber,
        });

        res.status(200).json({
            message: "SUCCESS",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await customerUsecase.deleteCustomer(id);

        res.status(200).json({
            message: "SUCCESS",
            data,
        });
    } catch (error) {
        next(error);
    }
};
