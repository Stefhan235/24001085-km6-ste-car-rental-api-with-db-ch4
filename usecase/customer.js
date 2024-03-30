const customerRepo = require("../repository/customer");

exports.getCustomers = async () => {
    const data = await customerRepo.getCustomers();
    return data;
};

exports.getCustomer = async (id) => {
    const data = await customerRepo.getCustomer(id);
    return data;
};

exports.createCustomer = async (payload) => {
    const data = await customerRepo.createCustomer(payload);
    return data;
};

exports.updateCustomer = async (id, payload) => {
    await customerRepo.updateCustomer(id, payload);
    const data = await customerRepo.getCustomer(id);
    return data;
};

exports.deleteCustomer = async (id) => {
    const data = await customerRepo.deleteCustomer(id);
    return data;
};
