const { register, login, profile } = require("../usecase/auth");
const { getTokenFromHeaders, extractToken } = require("../helper/auth");

exports.register = async (req, res, next) => {
    try {
        // get the body
        const { email, password, name, address, phoneNumber } = req.body;

        // get the photo
        const { image } = req.files;

        if (!email || email == "") {
            return next({
                message: "Email must be provided!",
                statusCode: 404,
            });
        }
        if (!password || password == "") {
            return next({
                message: "Password must be provided!",
                statusCode: 404,
            });
        }
        if (!name || name == "") {
            return next({
                message: "Name must be provided!",
                statusCode: 404,
            });
        }

        const data = await register({
            email,
            password,
            name,
            image,
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

exports.login = async (req, res, next) => {
    try {
        // get the body
        const { email, password } = req.body;

        if (email == "" || !email) {
            return next({
                message: "Email must be filled!",
                statusCode: 400,
            });
        }
        if (password == "" || !password) {
            return next({
                message: "Password must be filled!",
                statusCode: 400,
            });
        }

        // login logic
        const data = await login(email, password);

        res.status(200).json({
            message: "SUCCESS",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.profile = async (req, res, next) => {
    try {
        // get user by id
        const data = req.user;

        res.status(200).json({
            message: "SUCCESS",
            data,
        });
    } catch (error) {
        next(error);
    }
};

// const userUsecase = require("../usecase/user");

// exports.getUsers = async (req, res, next) => {
//     try {
//         const data = await userUsecase.getUsers();

//         res.status(200).json({
//             message: "SUCCESS",
//             data,
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// exports.getUser = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const data = await userUsecase.getUser(id);
//         if (!data) {
//             return next({
//                 message: `User with id ${id} is not found!`,
//                 statusCode: 404,
//             });
//         }

//         res.status(200).json({
//             message: "SUCCESS",
//             data,
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// exports.createUser = async (req, res, next) => {
//     try {
//         const { email, password, name, phoneNumber, address } = req.body;
//         const { image } = req.files;
//         if (!email || email == "") {
//             return next({
//                 message: "Email must be provided!",
//                 statusCode: 404,
//             });
//         }
//         if (!password || password == "") {
//             return next({
//                 message: "Password must be provided!",
//                 statusCode: 404,
//             });
//         }
//         if (!name || name == "") {
//             return next({
//                 message: "Name must be provided!",
//                 statusCode: 404,
//             });
//         }

//         const data = await userUsecase.createUser({
//             email,
//             password,
//             name,
//             image,
//             address,
//             phoneNumber,
//         });

//         res.status(201).json({
//             message: "SUCCESS",
//             data,
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// exports.updateUser = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const { email, password, name, phoneNumber, address } = req.body;
//         if (!email || email == "") {
//             return next({
//                 message: "Email must be provided!",
//                 statusCode: 404,
//             });
//         }
//         if (!password || password == "") {
//             return next({
//                 message: "Password must be provided!",
//                 statusCode: 404,
//             });
//         }
//         if (!name || name == "") {
//             return next({
//                 message: "Name must be provided!",
//                 statusCode: 404,
//             });
//         }

//         const data = await userUsecase.updateUser(id, {
//             email,
//             password,
//             name,
//             image,
//             address,
//             phoneNumber,
//         });

//         res.status(200).json({
//             message: "SUCCESS",
//             data,
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// exports.deleteUser = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const data = await userUsecase.deleteUser(id);

//         res.status(200).json({
//             message: "SUCCESS",
//             data,
//         });
//     } catch (error) {
//         next(error);
//     }
// };
