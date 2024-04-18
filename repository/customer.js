const { car, customer, reservation } = require("../models");
const { getData, setData, deleteData } = require("../helper/redis");

exports.getCustomers = async () => {
    const data = await customer.findAll({
        include: { model: reservation },
    });
    return data;
};

exports.getCustomer = async (id) => {
    const key = `customers:${id}`;

    let data = await getData(key);
    if (data) {
        return data;
    }

    data = await customer.findAll({
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

    throw new Error(`Customer is not found!`);
};

exports.createCustomer = async (payload) => {
    const data = await customer.create(payload);

    const key = `customers:${data.id}`;
    await setData(key, data, 300);

    return data;
};

exports.updateCustomer = async (id, payload) => {
    const key = `customers:${id}`;

    await customer.update(payload, {
        where: {
            id,
        },
    });

    const data = await customer.findAll({
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

    throw new Error(`Customer is not found!`);
};

exports.deleteCustomer = async (id) => {
    const key = `customers:${id}`;

    await customer.destroy({ where: { id } });

    await deleteData(key);

    return null;
};
