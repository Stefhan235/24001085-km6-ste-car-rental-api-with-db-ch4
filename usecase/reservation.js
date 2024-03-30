const reservationRepo = require("../repository/reservation");

exports.getReservations = async () => {
    const data = await reservationRepo.getReservations();
    return data;
};

exports.getReservation = async (id) => {
    const data = await reservationRepo.getReservation(id);
    return data;
};

exports.createReservation = async (payload) => {
    const data = await reservationRepo.createReservation(payload);
    return data;
};

exports.updateReservation = async (id, payload) => {
    await reservationRepo.updateReservation(id, payload);
    const data = await reservationRepo.getReservation(id);
    return data;
};

exports.deleteReservation = async (id) => {
    const data = await reservationRepo.deleteReservation(id);
    return data;
};
