const crypto = require("crypto");
const path = require("path");
const { car, customer, reservation } = require("../models");
const { uploader } = require("../helper/cloudinary");
const { getData, setData, deleteData } = require("../helper/redis");

exports.getCars = async () => {
    const data = await car.findAll({
        include: { model: reservation },
    });
    return data;
};

exports.getCar = async (id) => {
    const key = `cars:${id}`;

    let data = await getData(key);
    if (data) {
        return data;
    }

    data = await car.findAll({
        where: {
            id,
        },
        include: {
            model: reservation,
        },
    });
    if (data.length > 0) {
        await setData(key, data[0], 300);

        return data[0];
    }

    throw new Error(`Car is not found!`);
};

exports.createCar = async (payload) => {
    if (payload.image) {
        const { image } = payload;

        image.publicId = crypto.randomBytes(16).toString("hex");

        image.name = `${image.publicId}${path.parse(image.name).ext}`;

        const imageUpload = await uploader(image);
        payload.image = imageUpload.secure_url;
    }

    const data = await car.create(payload);

    const key = `cars:${data.id}`;
    await setData(key, data, 300);

    return data;
};

exports.updateCar = async (id, payload) => {
    const key = `cars:${id}`;

    if (payload.image) {
        const { image } = payload;

        image.publicId = crypto.randomBytes(16).toString("hex");

        image.name = `${image.publicId}${path.parse(image.name).ext}`;

        const imageUpload = await uploader(image);
        payload.image = imageUpload.secure_url;
    }

    await car.update(payload, {
        where: {
            id,
        },
    });

    const data = await car.findAll({
        where: {
            id,
        },
        include: {
            model: reservation,
        },
    });
    if (data.length > 0) {
        await setData(key, data[0], 300);
        return data[0];
    }

    return data;
};

exports.deleteCar = async (id) => {
    const key = `cars:${id}`;

    await car.destroy({ where: { id } });

    await deleteData(key);

    return null;
};