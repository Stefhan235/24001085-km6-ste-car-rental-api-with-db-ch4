const { car, customer, reservation } = require("../models");
const { getData, setData, deleteData } = require("../helper/redis");

exports.getReservations = async () => {
    const data = await reservation.findAll({
        include: [{ model: customer }, { model: car }],
    });
    return data;
};

exports.getReservation = async (id) => {
    const key = `reservations:${id}`;

    let data = await getData(key);
    if (data) {
        return data;
    }

    data = await reservation.findAll({
        where: {
            id,
        },
        include: [{ model: customer }, { model: car }],
    });
    if (data.length > 0) {
        await setData(key, data[0], 300);

        return data[0];
    }

    throw new Error(`Reservation is not found!`);
};

exports.createReservation = async (payload) => {
    const data = await reservation.create(payload);

    const key = `reservations:${data.id}`;
    await setData(key, data, 300);

    return data;
};

exports.updateReservation = async (id, payload) => {
    const key = `reservations:${id}`;

    await reservation.update(payload, {
        where: {
            id,
        },
    });

    const data = await reservation.findAll({
        where: {
            id,
        },
        include: [{ model: customer }, { model: car }],
    });
    if (data.length > 0) {
        await setData(key, data[0], 300);
        return data[0];
    }

    throw new Error(`Reservation is not found!`);
};

exports.deleteReservation = async (id) => {
    const key = `reservations:${id}`;

    await reservation.destroy({ where: { id } });

    await deleteData(key);

    return null;
};
