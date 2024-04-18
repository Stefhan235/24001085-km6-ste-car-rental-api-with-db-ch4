const crypto = require("crypto");
const path = require("path");
const bcrypt = require("bcrypt");
const { car, user, reservation } = require("../models");
const { uploader } = require("../helper/cloudinary");
const { getData, setData, deleteData } = require("../helper/redis");

exports.createUser = async (payload) => {
    // encrypt the password
    payload.password = bcrypt.hashSync(payload.password, 10);

    if (payload.image) {
        const { image } = payload;

        image.publicId = crypto.randomBytes(16).toString("hex");

        image.name = `${image.publicId}${path.parse(image.name).ext}`;

        const imageUpload = await uploader(image);
        payload.image = imageUpload.secure_url;
    }

    const data = await user.create(payload);

    const keyID = `users:${data.id}`;
    await setData(keyID, data, 300);

    const keyEmail = `users:${data.email}`;
    await setData(keyEmail, data, 300);

    return data;
};

exports.getUserByID = async (id) => {
    const key = `users:${id}`;

    // get from redis
    let data = await getData(key);
    if (data) {
        return data;
    }

    // get from db
    data = await user.findAll({
        where: {
            id,
        },
    });
    if (data.length > 0) {
        // save to redis
        await setData(key, data[0], 300);

        return data[0];
    }

    throw new Error(`User is not found!`);
};

exports.getUserByEmail = async (email) => {
    const key = `users:${email}`;

    // get from redis
    let data = await getData(key);
    if (data) {
        return data;
    }

    // get from db
    data = await user.findAll({
        where: {
            email,
        },
    });
    if (data.length > 0) {
        // save to redis
        await setData(key, data[0], 300);

        return data[0];
    }

    throw new Error(`Email is not register!`);
};

// exports.updateUser = async (id, payload) => {
//     const key = `users:${id}`;

//     // if (payload.image) {
//     //     const { image } = payload;

//     //     image.publicId = crypto.randomBytes(16).toString("hex");

//     //     image.name = `${image.publicId}${path.parse(image.name).ext}`;

//     //     const imageUpload = await uploader(image);
//     //     payload.image = imageUpload.secure_url;
//     // }

//     await user.update(payload, {
//         where: {
//             id,
//         },
//     });

//     const data = await user.findAll({
//         where: {
//             id,
//         },
//         include: {
//             model: reservation,
//         },
//     });
//     if (data.length > 0) {
//         await setData(key, data[0], 300);
//         return data[0];
//     }

//     throw new Error(`User is not found!`);
//     // return data;
// };

// exports.deleteUser = async (id) => {
//     const key = `users:${id}`;

//     await user.destroy({ where: { id } });

//     await deleteData(key);

//     return null;
// };

// exports.getUsers = async () => {
//     const data = await user.findAll({
//         include: { model: reservation },
//     });
//     return data;
// };

// exports.getUser = async (id) => {
//     const key = `users:${id}`;

//     let data = await getData(key);
//     if (data) {
//         return data;
//     }

//     data = await user.findAll({
//         where: {
//             id,
//         },
//         include: {
//             model: reservation,
//         },
//     });
//     if (data.length > 0) {
//         await setData(key, data[0], 300);

//         return data[0];
//     }

//     throw new Error(`User is not found!`);
// };
